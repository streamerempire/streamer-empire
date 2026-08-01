/*
  Streamer Empire — content patch
  Version: 2026-08-01
  Purpose:
  1) Standardize every earnings reference in all supported languages.
  2) Change every "at least 3 photos" instruction to "at least 10 photos of yourself".
  3) Validate native image-upload fields so fewer than 10 photos cannot be submitted.
*/
(() => {
  "use strict";

  const COPY = {
    es: {
      earnings: "Trabajo sin necesidad de experiencia, sin requisitos escolares. Ganancias de $1,000 a $3,000 dólares al mes o mucho más; dependen de la actividad de la audiencia, las donaciones y las horas.",
      photos: "Sube al menos 10 fotos tuyas.",
      photoError: "Debes subir al menos 10 fotos tuyas antes de enviar la solicitud."
    },
    en: {
      earnings: "No experience or educational requirements. Earnings of $1,000 to $3,000 USD per month or much more; they depend on audience activity, donations, and hours.",
      photos: "Upload at least 10 photos of yourself.",
      photoError: "You must upload at least 10 photos of yourself before submitting the application."
    },
    nz: {
      earnings: "No experience or educational requirements. Earnings of $1,000 to $3,000 USD per month or much more; they depend on audience activity, donations, and hours.",
      photos: "Upload at least 10 photos of yourself.",
      photoError: "You must upload at least 10 photos of yourself before submitting the application."
    },
    pt: {
      earnings: "Trabalho sem necessidade de experiência ou requisitos escolares. Ganhos de US$ 1.000 a US$ 3.000 por mês ou muito mais; dependem da atividade do público, das doações e das horas.",
      photos: "Envie pelo menos 10 fotos suas.",
      photoError: "Você deve enviar pelo menos 10 fotos suas antes de enviar a candidatura."
    },
    it: {
      earnings: "Lavoro senza esperienza o requisiti scolastici. Guadagni da 1.000 a 3.000 USD al mese o molto di più; dipendono dall’attività del pubblico, dalle donazioni e dalle ore.",
      photos: "Carica almeno 10 foto di te.",
      photoError: "Devi caricare almeno 10 foto di te prima di inviare la candidatura."
    },
    fr: {
      earnings: "Travail sans expérience ni diplôme requis. Revenus de 1 000 à 3 000 USD par mois, voire beaucoup plus; ils dépendent de l’activité de l’audience, des dons et des heures.",
      photos: "Téléversez au moins 10 photos de vous.",
      photoError: "Vous devez téléverser au moins 10 photos de vous avant d’envoyer la candidature."
    },
    ko: {
      earnings: "경력이나 학력 요건 없이 일할 수 있습니다. 월 수익은 미화 1,000달러에서 3,000달러 또는 그 이상이며, 시청자 활동, 후원 및 활동 시간에 따라 달라집니다.",
      photos: "본인 사진을 최소 10장 업로드하세요.",
      photoError: "지원서를 제출하기 전에 본인 사진을 최소 10장 업로드해야 합니다."
    },
    zh: {
      earnings: "无需经验或学历要求。每月收入为 1,000 至 3,000 美元，或可能更高；具体取决于观众活跃度、打赏和投入时间。",
      photos: "请上传至少 10 张本人照片。",
      photoError: "提交申请前，您必须上传至少 10 张本人照片。"
    },
    ja: {
      earnings: "経験や学歴の要件はありません。月収は1,000〜3,000米ドル、またはそれ以上になる場合があり、視聴者の活動、寄付、稼働時間によって異なります。",
      photos: "ご本人の写真を少なくとも10枚アップロードしてください。",
      photoError: "応募を送信する前に、ご本人の写真を少なくとも10枚アップロードしてください。"
    }
  };

  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "TEXTAREA", "OPTION", "NOSCRIPT", "CODE", "PRE"]);

  const earningsRangePattern =
    /(?:US?\$|USD|d[oó]lares?|dollars?|euros?)?\s*1[\s.,]?000[\s\S]{0,180}(?:US?\$|USD|d[oó]lares?|dollars?|euros?)?\s*3[\s.,]?000/i;

  const earningsKeywordPattern =
    /\b(?:earnings?|income|ganancias?|ganhos?|rendimentos?|guadagni|revenus?|수익|收入|収入)\b/i;

  const photoPatternLatin =
    /(?:at\s+least|minimum|mínimo|al\s+menos|pelo\s+menos|au\s+moins|almeno|minimum\s+of)?[\s\S]{0,45}\b3\b[\s\S]{0,45}\b(?:photos?|fotos?|fotografie|images?)\b|\b(?:photos?|fotos?|fotografie|images?)\b[\s\S]{0,45}\b3\b/i;

  const photoPatternAsian =
    /(?:최소|至少|少なくとも)[\s\S]{0,18}3[\s\S]{0,18}(?:장|张|枚|사진|照片|写真)/i;

  const anyPhotoWord = /photos?|fotos?|fotografie|images?|사진|照片|写真/i;

  function getLanguage() {
    const selector = document.querySelector(
      "#language, #langSel, .language-select, select.lang, select[aria-label='Language']"
    );
    const raw = String(selector?.value || document.documentElement.lang || "en").toLowerCase();

    if (raw.startsWith("es")) return "es";
    if (raw === "nz" || raw.includes("new-zealand") || raw.includes("new_zealand")) return "nz";
    if (raw.startsWith("pt")) return "pt";
    if (raw.startsWith("it")) return "it";
    if (raw.startsWith("fr")) return "fr";
    if (raw.startsWith("ko")) return "ko";
    if (raw.startsWith("zh")) return "zh";
    if (raw.startsWith("ja")) return "ja";
    return "en";
  }

  function replacementFor(text, lang) {
    const copy = COPY[lang] || COPY.en;
    const normalized = text.replace(/\s+/g, " ").trim();

    if (earningsRangePattern.test(normalized) && earningsKeywordPattern.test(normalized)) {
      return copy.earnings;
    }

    if (photoPatternLatin.test(normalized) || photoPatternAsian.test(normalized)) {
      return copy.photos;
    }

    return null;
  }

  function preserveOuterWhitespace(original, replacement) {
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    return `${leading}${replacement}${trailing}`;
  }

  function patchTextNodes(root = document.body) {
    if (!root) return;
    const lang = getLanguage();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    for (const node of nodes) {
      const parent = node.parentElement;
      if (!parent || SKIP_TAGS.has(parent.tagName)) continue;

      const original = node.nodeValue || "";
      if (!original.trim()) continue;

      const replacement = replacementFor(original, lang);
      if (replacement && original.trim() !== replacement) {
        node.nodeValue = preserveOuterWhitespace(original, replacement);
      }
    }
  }

  function patchAttributes(root = document) {
    const lang = getLanguage();
    const attrs = ["placeholder", "aria-label", "title"];

    root.querySelectorAll?.("*").forEach((el) => {
      if (SKIP_TAGS.has(el.tagName)) return;
      for (const attr of attrs) {
        const original = el.getAttribute(attr);
        if (!original) continue;
        const replacement = replacementFor(original, lang);
        if (replacement) el.setAttribute(attr, replacement);
      }
    });
  }

  function patchTranslationObject(obj, langHint = null, depth = 0, seen = new WeakSet()) {
    if (!obj || typeof obj !== "object" || depth > 8 || seen.has(obj)) return;
    seen.add(obj);

    for (const [key, value] of Object.entries(obj)) {
      const possibleLang = COPY[key] ? key : langHint;

      if (typeof value === "string") {
        const replacement = replacementFor(value, possibleLang || getLanguage());
        if (replacement) obj[key] = replacement;
      } else if (value && typeof value === "object") {
        patchTranslationObject(value, possibleLang, depth + 1, seen);
      }
    }
  }

  function patchKnownTranslations() {
    [
      "SE_TRANSLATIONS",
      "translations",
      "TRANSLATIONS",
      "i18nTranslations",
      "languageTranslations"
    ].forEach((name) => {
      try {
        if (window[name]) patchTranslationObject(window[name]);
      } catch (error) {
        console.warn(`[Streamer Empire patch] Could not patch ${name}:`, error);
      }
    });
  }

  function nearbyText(input) {
    const container =
      input.closest("label, .form-group, .field, .upload-field, .question, .card") ||
      input.parentElement;
    return container?.innerText || "";
  }

  function isPhotoInput(input) {
    if (!(input instanceof HTMLInputElement) || input.type !== "file") return false;
    const accept = String(input.accept || "").toLowerCase();
    const name = `${input.name || ""} ${input.id || ""} ${input.getAttribute("aria-label") || ""}`;
    return accept.includes("image") || anyPhotoWord.test(name) || anyPhotoWord.test(nearbyText(input));
  }

  function validatePhotoInput(input) {
    if (!isPhotoInput(input)) return true;
    const lang = getLanguage();
    const count = input.files?.length || 0;

    if (count > 0 && count < 10) {
      input.setCustomValidity(COPY[lang]?.photoError || COPY.en.photoError);
      return false;
    }

    input.setCustomValidity("");
    return true;
  }

  function installPhotoValidation() {
    document.querySelectorAll("input[type='file']").forEach((input) => {
      if (!isPhotoInput(input) || input.dataset.sePhotoValidation === "1") return;
      input.dataset.sePhotoValidation = "1";
      input.addEventListener("change", () => validatePhotoInput(input));
    });
  }

  function runPatch() {
    patchKnownTranslations();
    patchTextNodes();
    patchAttributes();
    installPhotoValidation();
  }

  let scheduled = false;
  function schedulePatch() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      runPatch();
    });
  }

  document.addEventListener("DOMContentLoaded", runPatch, { once: true });

  document.addEventListener(
    "change",
    (event) => {
      if (event.target?.matches?.("#language, #langSel, .language-select, select.lang, select[aria-label='Language']")) {
        setTimeout(runPatch, 0);
        setTimeout(runPatch, 150);
      }
      if (event.target instanceof HTMLInputElement && event.target.type === "file") {
        validatePhotoInput(event.target);
      }
    },
    true
  );

  document.addEventListener(
    "submit",
    (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;

      const photoInputs = [...form.querySelectorAll("input[type='file']")].filter(isPhotoInput);
      const valid = photoInputs.every(validatePhotoInput);

      if (!valid) {
        event.preventDefault();
        event.stopImmediatePropagation();
        photoInputs.find((input) => !input.checkValidity())?.reportValidity();
      }
    },
    true
  );

  const observer = new MutationObserver(schedulePatch);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });

  runPatch();
})();
