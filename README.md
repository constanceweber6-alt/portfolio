# Constance Weber, portfolio

Personal site: https://constanceweber6-alt.github.io/portfolio/

Consultant in operational transformation, change management and CSR. The site is available in English, French and Japanese.

## How it is built

A static page, no framework, no server, no cookies.

| Path | Role |
| --- | --- |
| `content/en.json`, `fr.json`, `ja.json` | All the texts, one file per language |
| `content/config.json` | Contact email and CV file paths |
| `src/index.template.html` | Page structure |
| `tools/build.py` | Writes `index.html` (English text inside) and `assets/i18n.js` |
| `assets/style.css`, `assets/main.js` | Design, language switch, small entrance effects |
| `cv/` | CV files in PDF |

To change a text: edit the JSON files, then run `python3 tools/build.py`.

The language follows the visitor's browser and can be forced with `?lang=fr` or `?lang=ja`.

## Projects shown

* [CSR pre-assessment](https://github.com/constanceweber6-alt/rse-prediagnostic)
* [Change Barometer](https://github.com/constanceweber6-alt/change-barometer)
