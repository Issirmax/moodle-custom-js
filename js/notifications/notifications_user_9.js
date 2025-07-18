document.addEventListener("DOMContentLoaded", async function () {
    console.log("Script iniciado segunda vez");
    
    function esperarPreElement() {
        return new Promise((resolve, reject) => {
            const checkElement = () => {
                const preElement = document.querySelector('.notification-area .content-area .content pre');
                if (preElement) {
                    resolve(preElement);
                } else {
                    setTimeout(checkElement, 100);
                }
            };
            checkElement();
            
            // Timeout después de 5 segundos
            setTimeout(() => reject(new Error('Elemento no encontrado')), 5000);
        });
    }
    
    try {
        const preElement = await esperarPreElement();
        console.log('Pre element encontrado:', preElement);
        console.log('Contenido:', preElement.textContent);
    } catch (error) {
        console.log('Error:', error.message);
    }
});

// document.addEventListener("DOMContentLoaded", function () {
//     console.log("pruebaaa 5");
//     console.log("Script iniciado");
    
 


//     // preElements.forEach((pre, index) => {

//     //     let text = pre.textContent || pre.innerText;

//     //     text = text.replace(/Hola, ([^,]+), /, 'Hola, $1,<br><br>');
//     //     text = text.replace(/ en el curso /, '<br><br>en el curso ');
//     //     text = text.replace(/ Puede revisar/, '<br><br>Puede revisar');

//     //     const urlRegex = /(https?:\/\/[^\s]+)/g;
//     //     text = text.replace(urlRegex, function(url) {
//     //         return `<a href="${url}" target="_blank">${url}</a>`;
//     //     });

//     //     text = text.replace(/\n/g, "<br>");

//     //     console.log("Texto procesado:", text);

//     //     const paragraph = document.createElement("p");
//     //     paragraph.innerHTML = text;

//     //     if (pre.parentNode) {
//     //         pre.parentNode.replaceChild(paragraph, pre);
//     //         console.log(`Elemento ${index + 1} reemplazado exitosamente`);
//     //     }
//     // });
// });