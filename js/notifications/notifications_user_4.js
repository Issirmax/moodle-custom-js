document.addEventListener("DOMContentLoaded", function () {
    console.log("pruebaaa 3");
    console.log("Script iniciado");
    
    // Opción 1: Esperar a que el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        const preElement = document.querySelector('.notification-area .content-area .content pre');
        console.log(preElement);
    });

// Opción 2: Usar un selector más específico
    const preElement = document.querySelector('div.notification-area.show-content-area div.content-area div.content pre');

    console.log('pre element:', preElement);


    // preElements.forEach((pre, index) => {

    //     let text = pre.textContent || pre.innerText;

    //     text = text.replace(/Hola, ([^,]+), /, 'Hola, $1,<br><br>');
    //     text = text.replace(/ en el curso /, '<br><br>en el curso ');
    //     text = text.replace(/ Puede revisar/, '<br><br>Puede revisar');

    //     const urlRegex = /(https?:\/\/[^\s]+)/g;
    //     text = text.replace(urlRegex, function(url) {
    //         return `<a href="${url}" target="_blank">${url}</a>`;
    //     });

    //     text = text.replace(/\n/g, "<br>");

    //     console.log("Texto procesado:", text);

    //     const paragraph = document.createElement("p");
    //     paragraph.innerHTML = text;

    //     if (pre.parentNode) {
    //         pre.parentNode.replaceChild(paragraph, pre);
    //         console.log(`Elemento ${index + 1} reemplazado exitosamente`);
    //     }
    // });
});