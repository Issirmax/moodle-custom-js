document.addEventListener("DOMContentLoaded", function () {
    console.log("pruebaaa 5");
    console.log("Script iniciado");
    
    const notificationArea = document.querySelector('.notification-area');
    const contentArea = notificationArea.querySelector('.content-area');
    const content = contentArea.querySelector('.content > pre');
    const preElement = contentArea.querySelector('pre');
    
    console.log("Área de notificaciones:", notificationArea);
    console.log("Área de contenido:", contentArea);
    console.log("Contenido:", content);
    
    console.log("Elementos encontrados:", preElement);


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