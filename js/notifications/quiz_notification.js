document.addEventListener("DOMContentLoaded", async function () {
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

            setTimeout(() => reject(new Error('Elemento no encontrado')), 2000);
        });
    }

    try {
        const preElement = await esperarPreElement();

        let text = preElement.textContent || preElement.innerText;

        text = text.replace(/Hola, ([^,]+), /, 'Hola, $1,<br><br>');
        text = text.replace(/ en el curso /, '<br><br>en el curso ');
        text = text.replace(/ Puede revisar/, '<br><br>Puede revisar');

        const urlRegex = /(https?:\/\/[^\s]+)/g;
        text = text.replace(urlRegex, function (url) {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        });

        text = text.replace(/\n/g, "<br>");

        const paragraph = document.createElement("p");
        paragraph.innerHTML = text;

        if (preElement.parentNode) {
            preElement.parentNode.replaceChild(paragraph, preElement);
            console.log("Contenido reemplazado correctamente sin recarga.");
        }
    } catch (error) {
        console.log('Error:', error.message);
    }
});
