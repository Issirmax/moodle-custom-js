document.addEventListener("DOMContentLoaded", function () {
  console.log("[BBB DEBUG] Página cargada:", window.location.href);

  if (
    !window.location.href.includes("/course/modedit.php?update") &&
    !window.location.href.includes("/course/modedit.php?add=bigbluebutton")
  ) {
    console.log("[BBB DEBUG] Página no es de edición/creación de videoconferencia. Abortando.");
    return;
  }

  console.log("[BBB DEBUG] Página válida para validar videoconferencia.");

  const form = document.querySelector('form[action*="modedit.php"].mform');
  if (!form) {
    console.warn("[BBB DEBUG] Formulario no encontrado.");
    return;
  }

  console.log("[BBB DEBUG] Formulario encontrado:", form);

  const inputFechaInicio = document.querySelector('select[name="openingtime[day]"]')?.closest(".fdate_time_selector");
  const inputFechaFin = document.querySelector('select[name="closingtime[day]"]')?.closest(".fdate_time_selector");

  if (!inputFechaInicio || !inputFechaFin) {
    console.warn("[BBB DEBUG] No se encontraron los contenedores de fechas de inicio o fin.");
    return;
  }

  console.log("[BBB DEBUG] Campos de fecha encontrados.");
  console.log("[BBB DEBUG] Contenedor fecha inicio:", inputFechaInicio);
  console.log("[BBB DEBUG] Contenedor fecha fin:", inputFechaFin);

  const obtenerTimestampDesdeCampos = (prefix) => {
    const getValue = (name) => parseInt(document.querySelector(`select[name="${prefix}[${name}]"]`)?.value || 0);

    const dia = getValue("day");
    const mes = getValue("month") - 1;
    const anio = getValue("year");
    const hora = getValue("hour");
    const minuto = getValue("minute");

    console.log(`[BBB DEBUG] ${prefix}: Día=${dia}, Mes=${mes + 1}, Año=${anio}, Hora=${hora}, Minuto=${minuto}`);

    return new Date(anio, mes, dia, hora, minuto).getTime();
  };

  const ahora = Date.now();
  console.log("[BBB DEBUG] Timestamp actual:", ahora, new Date(ahora));

  const inicioTimestamp = obtenerTimestampDesdeCampos("openingtime");
  const finTimestamp = obtenerTimestampDesdeCampos("closingtime");

  console.log("[BBB DEBUG] Timestamp inicio:", inicioTimestamp, new Date(inicioTimestamp));
  console.log("[BBB DEBUG] Timestamp fin:", finTimestamp, new Date(finTimestamp));

  if (ahora >= inicioTimestamp || ahora >= finTimestamp) {
    console.warn("[BBB DEBUG] La sesión ya inició o finalizó. Deshabilitando campos...");

    const camposDeshabilitar = form.querySelectorAll("input, select, textarea, button");

    camposDeshabilitar.forEach((campo) => {
      if (campo.name !== "cancel" && campo.type !== "hidden") {
        campo.setAttribute("disabled", "true");
        console.log(`[BBB DEBUG] Campo deshabilitado: name=${campo.name}, type=${campo.type}`);
      }
    });

    const mensaje = document.createElement("div");
    mensaje.className = "alert alert-warning mt-3";
    mensaje.innerHTML = "⚠️ Esta videoconferencia ya ha iniciado o finalizado y no se puede editar.";
    form.prepend(mensaje);
    console.log("[BBB DEBUG] Mensaje de advertencia insertado.");
  } else {
    console.log("[BBB DEBUG] La sesión aún no ha iniciado. Edición permitida.");
  }
});
