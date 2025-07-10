document.addEventListener("DOMContentLoaded", function () {
  if (
    !window.location.href.includes("/course/modedit.php?update") &&
    !window.location.href.includes("/course/modedit.php?add=bigbluebutton")
  )
    return;

  console.log("Bloqueando edición de videoconferencias iniciadas o finalizadas...");

  const form = document.querySelector('form[action*="modedit.php"].mform');
  if (!form) return;

  const inputFechaInicio = document.querySelector('input[name="openingtime[day]"]')?.closest(".fdate_time_selector");
  const inputFechaFin = document.querySelector('input[name="closingtime[day]"]')?.closest(".fdate_time_selector");

  if (!inputFechaInicio || !inputFechaFin) {
    console.warn("Campos de fecha no encontrados.");
    return;
  }

  // Obtener timestamps actuales de los campos
  const obtenerTimestampDesdeCampos = (prefix) => {
    const dia = parseInt(document.querySelector(`select[name="${prefix}[day]"]`)?.value || 0);
    const mes = parseInt(document.querySelector(`select[name="${prefix}[month]"]`)?.value || 0) - 1;
    const anio = parseInt(document.querySelector(`select[name="${prefix}[year]"]`)?.value || 0);
    const hora = parseInt(document.querySelector(`select[name="${prefix}[hour]"]`)?.value || 0);
    const minuto = parseInt(document.querySelector(`select[name="${prefix}[minute]"]`)?.value || 0);
    return new Date(anio, mes, dia, hora, minuto).getTime();
  };

  const ahora = Date.now();
  const inicioTimestamp = obtenerTimestampDesdeCampos("openingtime");
  const finTimestamp = obtenerTimestampDesdeCampos("closingtime");

  console.log("Inicio:", new Date(inicioTimestamp), "Fin:", new Date(finTimestamp), "Ahora:", new Date(ahora));

  if (ahora >= inicioTimestamp || ahora >= finTimestamp) {
    console.warn("La sesión ya inició o finalizó. Deshabilitando campos...");

    const camposDeshabilitar = form.querySelectorAll("input, select, textarea, button");

    camposDeshabilitar.forEach((campo) => {
      if (campo.name !== "cancel" && campo.type !== "hidden") {
        campo.setAttribute("disabled", "true");
      }
    });

    const mensaje = document.createElement("div");
    mensaje.className = "alert alert-warning mt-3";
    mensaje.innerHTML = "⚠️ Esta videoconferencia ya ha iniciado o finalizado y no se puede editar.";
    form.prepend(mensaje);
  }
});
