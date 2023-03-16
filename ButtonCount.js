class ButtonCount extends HTMLElement{
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open'});

        const button = document.createElement('button');
        let count = 0;

        function updateCount() {
            button.innerHTML = `Times Clicked: ${count}`;
        };

        updateCount();

        button.addEventListener('click', () => {
            count++;
            updateCount();
        });

        shadowRoot.appendChild(button);
    }
}

customElements.define("button-count",ButtonCount)