document.addEventListener("DOMContentLoaded", function () {
  const isEditPage = window.location.href.includes("/course/modedit.php?update");
  const isCreatePage = window.location.href.includes("/course/modedit.php?add=bigbluebutton");

  if (!isEditPage && !isCreatePage) return;

  const form = document.querySelector('form[action*="modedit.php"].mform');
  if (!form) return;

  const inputFechaInicio = document.querySelector('select[name="openingtime[day]"]')?.closest(".fdate_time_selector");
  const inputFechaFin = document.querySelector('select[name="closingtime[day]"]')?.closest(".fdate_time_selector");

  if (!inputFechaInicio || !inputFechaFin) return;

  const getTimestamp = (prefix) => {
    const getVal = (name) => parseInt(document.querySelector(`select[name="${prefix}[${name}]"]`)?.value || 0);
    const d = getVal("day"), m = getVal("month") - 1, y = getVal("year"), h = getVal("hour"), min = getVal("minute");
    return new Date(y, m, d, h, min).getTime();
  };

  if (isEditPage) {
    const now = Date.now();
    const start = getTimestamp("openingtime");
    const end = getTimestamp("closingtime");

    if (now >= start || now >= end) {
      const fields = form.querySelectorAll("input, select, textarea, button");
      fields.forEach((i) => {
        if (i.name !== "cancel" && i.type !== "hidden") {
          i.setAttribute("disabled", "true");
        }
      });

      const msg = document.createElement("div");
      msg.className = "alert alert-warning mt-3";
      msg.innerHTML = "⚠️ Esta videoconferencia ya ha iniciado o finalizado y no se puede editar.";
      form.prepend(msg);
    }
  }
});
