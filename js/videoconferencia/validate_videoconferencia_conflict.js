document.addEventListener("DOMContentLoaded", function () {
  if (!window.location.href.includes("/course/modedit.php?update")) {
    console.log("[CONFLICT DEBUG] Página no es de edición de videoconferencia. Abortando.");
    return;
  }

  const form = document.querySelector('form[action*="modedit.php"].mform');
  if (!form) {
    console.log("[CONFLICT DEBUG] Formulario no encontrado.");
    return;
  }

  console.log("[CONFLICT DEBUG] Formulario de edición de videoconferencia encontrado.");

  const obtenerTimestampDesdeCampos = (prefix) => {
    const getVal = (name) => {
      const sel = document.querySelector(`select[name="${prefix}[${name}]"]`);
      if (!sel) console.warn(`[CONFLICT DEBUG] Campo no encontrado: ${prefix}[${name}]`);
      return parseInt(sel?.value || 0);
    };
    const dia = getVal("day");
    const mes = getVal("month") - 1;
    const anio = getVal("year");
    const hora = getVal("hour");
    const minuto = getVal("minute");

    const fecha = new Date(anio, mes, dia, hora, minuto);
    console.log(`[CONFLICT DEBUG] ${prefix} = ${fecha.toString()}`);
    return fecha.getTime();
  };

  const obtenerSesionesDelCurso = () => {
    const sesiones = [];
    const actividades = document.querySelectorAll('.activity.modtype_bigbluebuttonbn');

    console.log(`[CONFLICT DEBUG] Se encontraron ${actividades.length} actividades BBB en el curso.`);

    actividades.forEach((act, idx) => {
      const texto = act.textContent;
      console.log(`[CONFLICT DEBUG] [${idx}] Actividad:`, texto.trim());

      const match = texto.match(/(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})/); // Ajusta si cambia el formato

      if (match) {
        const [, dia, mes, anio, hora, minuto] = match.map(Number);
        const inicio = new Date(anio, mes - 1, dia, hora, minuto).getTime();
        const fin = inicio + 60 * 60 * 1000; // Asumimos duración 1h
        sesiones.push({ inicio, fin });
        console.log(`[CONFLICT DEBUG]   ↳ Inicio: ${new Date(inicio)}, Fin: ${new Date(fin)}`);
      } else {
        console.warn(`[CONFLICT DEBUG]   ↳ No se pudo parsear la fecha en esta actividad.`);
      }
    });

    return sesiones;
  };

  form.addEventListener("submit", function (e) {
    console.log("[CONFLICT DEBUG] Validando posibles conflictos de horarios...");

    const nuevaInicio = obtenerTimestampDesdeCampos("openingtime");
    const nuevaFin = obtenerTimestampDesdeCampos("closingtime");

    console.log(`[CONFLICT DEBUG] Nueva sesión: ${new Date(nuevaInicio)} → ${new Date(nuevaFin)}`);

    const otrasSesiones = obtenerSesionesDelCurso();

    const conflicto = otrasSesiones.some((s, i) => {
      const traslape = nuevaInicio < s.fin && nuevaFin > s.inicio;
      if (traslape) {
        console.warn(`[CONFLICT DEBUG] ⚠️ Conflicto detectado con sesión [${i}]`);
      }
      return traslape;
    });

    if (conflicto) {
      e.preventDefault();
      alert("❌ Conflicto de horarios: Ya existe otra sesión programada que se empalma.");
    } else {
      console.log("[CONFLICT DEBUG] ✅ No se detectaron conflictos. Envío permitido.");
    }
  });
});
