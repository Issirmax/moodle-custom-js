document.addEventListener("DOMContentLoaded", function () {
  console.log("Validando campos del curso...");
  let e = [
      { name: "shortname", label: "Nombre corto del curso" }
    ];
    a = document.querySelector("form");
  console.log("Formulario encontrado:", a);
  a.addEventListener("submit", function (a) {
    console.log("Validando campos del curso...");
    let t = !1;
    e.forEach((e) => {
      console.log(`- Validando campo: ${e.name}`);
      let a = document.querySelector(`input[name="${e.name}"]`);
      if (!a) {
        console.warn(`- Campo no encontrado: ${e.name}`);
        return;
      }
      let l = `${e.name}-error`,
        r = document.getElementById(l);
      r ||
        (((r = document.createElement("div")).id = l),
        (r.style.color = "red"),
        (r.style.fontSize = "0.9em"),
        (r.style.marginTop = "4px"),
        a.insertAdjacentElement("afterend", r)),
        (r.innerHTML = "");
      let o = a.value;
      o.length > 100
        console.log("- Validando longitud del campo:", e.name),
        ((r.innerHTML = `<br>- ${e.label} nor puede tener m\xe1s de 100 caractees.`),
          (t = !0));
    }),
      t && a.preventDefault();
  });
});
