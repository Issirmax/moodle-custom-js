document.addEventListener("DOMContentLoaded", function () {
  console.log("Validando campos del curso...");

  const campos = [
    { name: "shortname", label: "Nombre corto del curso" },
    { name: "fullname", label: "Nombre completo del curso" },
  ];

  const form = document.querySelector('form[action*="course/edit.php"].mform');
  if (!form) {
    console.warn("Formulario no encontrado.");
    return;
  }

  console.log("Formulario encontrado:", form);

  form.addEventListener("submit", function (event) {
    console.log("Validando campos del curso...");
    let hasError = false;

    campos.forEach((campo) => {
      console.log(`- Validando campo: ${campo.name}`);
      const input = document.querySelector(`input[name="${campo.name}"]`);

      if (!input) {
        console.warn(`- Campo no encontrado: ${campo.name}`);
        return;
      }

      const errorId = `${campo.name}-error`;
      let errorElement = document.getElementById(errorId);

      if (!errorElement) {
        errorElement = document.createElement("div");
        errorElement.id = errorId;
        errorElement.style.color = "red";
        errorElement.style.fontSize = "0.9em";
        errorElement.style.marginTop = "4px";
        input.insertAdjacentElement("afterend", errorElement);
      }

      errorElement.innerHTML = "";

      const value = input.value.trim();
      if(campo.name === "shortname" && value.length > 100) {
        console.log("- Validando longitud del campo:", campo.name);
        errorElement.innerHTML = `<br> <br>- ${campo.label} no puede tener más de 100 caracteres.`;
        hasError = true;
      }
      if (campo.name === "fullname" && value.length > 255) {
        console.log("- Validando longitud del campo:", campo.name);
        errorElement.innerHTML = `<br> <br>- ${campo.label} no puede tener más de 255 caracteres.`;
        hasError = true;
      }
      
    });

    if (hasError) {
      event.preventDefault();
    }
  });
});