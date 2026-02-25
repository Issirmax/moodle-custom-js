// document.addEventListener("DOMContentLoaded", function () {
//     if (
//         !window.location.href.includes("/course/view.php") &&
//         !window.location.href.includes("/mod/quiz/edit.php")
//     ) {
//         return;
//     }
//     console.log("*validando examenes en curso----");
//     detectQuizAttempts();
//     detectQuestionsOnQuiz();
//     /* Observar cambios en el DOM (sirve para el modo edicion)*/
//     const observer = new MutationObserver(() => {
//         detectQuestionsOnQuiz(); /* Vuelve a ejecutar si hay cambios*/
//     });
//     observer.observe(document.body, { childList: true, subtree: true });
// });

// function detectQuestionsOnQuiz() {
//     const enlaces = document.querySelectorAll(
//         'a[href*="/mod/quiz/"]:not([data-procesado]).aalink.stretched-link',
//     );
//     enlaces.forEach((enlace) => {
//         enlace.setAttribute("data-procesado", "true");
//         /* evitar procesar varias veces*/ /* Evitar duplicar el icon <i></i> si ya existe justo después*/ const siguiente =
//             enlace.nextElementSibling;
//         if (
//             siguiente &&
//             siguiente.tagName === "I" &&
//             siguiente.classList.contains("no-questions")
//         ) {
//             return; /* ya hay un <i>después del enlace*/
//         }
//         console.log(enlace.href, "href");
//         /* muestra la URL completa*/ fetch(enlace.href)
//             .then((res) => res.text())
//             .then((html) => {
//                 const parser = new DOMParser();
//                 const doc = parser.parseFromString(html, "text/html");
//                 /* Si se encuentra el mensaje de no hay preguntas*/
//                 const mensajeNoPreguntas = doc.querySelector("div.alert.alert-warning");
//                 if (mensajeNoPreguntas) {
//                     console.log("Registros", mensajeNoPreguntas.textContent);
//                     /* insertar un icon con el mensajeNoPreguntas.textContent*/
//                     const icon = document.createElement("i");
//                     icon.title = mensajeNoPreguntas.textContent;
//                     icon.setAttribute(
//                         "class",
//                         "no-questions fas fa-circle text-danger ms-3",
//                     );
//                     /* Insertar después del enlace*/
//                     enlace.insertAdjacentElement("beforeend", icon);
//                     const padreDiv = enlace.closest(
//                         ".activity.activity-wrapper.quiz.modtype_quiz",
//                     );
//                     if (padreDiv) {
//                         preventShowQuiz(padreDiv);
//                     }
//                 }
//             })
//             .catch((err) => console.error("Error al acceder:", err));
//     });
// }

// function preventShowQuiz(parent) {
//     const dropdownShowOption = parent.querySelectorAll(
//         'a[data-action="cmShow"]',
//     );
//     Array.from(dropdownShowOption).forEach((option) => {
//         if (
//             option.classList.contains("dropdown-item") &&
//             option.classList.contains("menu-action") &&
//             option.classList.contains("cm-edit-action")
//         ) {
//             option.classList.add(
//                 "hidden",
//             ); /*console.log("hay que esconderla", option);*/
//         }
//         if (
//             option.textContent.trim() == "Mostrar en página de curso" ||
//             option.textContent.trim() == "Show on course page"
//         ) {
//             console.log("ae", option.textContent.trim());
//             const parentOption = option.parentElement.parentElement;
//             parentOption.classList.remove("d-flex");
//             parentOption.classList.remove("position-relative");
//             parentOption.style.display = "none";
//         }
//     });
// }

// function detectQuizAttempts() {
//     /* Validar desde pestania Preguntas*/ if (
//         window.location.href.includes("/mod/quiz/edit.php")
//     ) {
//         /* Detecta si se encuentra el mensaje de alerta de intentos en el examen en la pestania Preguntas */ const alertaIntentosPreguntas =
//             document.querySelector("body#page-mod-quiz-edit .statusdisplay");
//         if (alertaIntentosPreguntas) {
//             const calificacionPreguntas = document.querySelector(
//                 "form.quizsavegradesform",
//             );
//             calificacionPreguntas.style.display = "none";
//         }
//         const bancoPreguntas = document.querySelectorAll(
//             "#page-mod-quiz-edit ul.section li a",
//         );
//         bancoPreguntas.forEach((a) => {
//             const span = document.createElement("span");
//             span.innerHTML = a.innerHTML;
//             span.className = a.className;
//             span.title = a.title;
//             a.parentNode.replaceChild(span, a);
//         });
//     }
//     /*Validar desde pestania Configuracion del examen */ const alertIntentos =
//         document.querySelector("#id_sebcontainer .alert");
//     if (alertIntentos) {
//         const input = document.getElementById("id_gradepass");
//         /* Input de calificacion*/ const span = document.createElement("span");
//         span.textContent = input.value;
//         /*Muestra el valor del input*/ input.parentNode.replaceChild(
//             span,
//             input,
//         );
//     }
// }
