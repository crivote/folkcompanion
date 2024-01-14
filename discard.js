// modify an area of DOM
class Render{
    
    constructor(areaid){
        this.area = document.getElementById(areaid); 
        this.setup();
    }

    setup() {
        this.area.addEventListener('click', this.tuneclick.bind(this));
    }   

    async tuneclick(event) {
        // click on names tag to get the tune card
        if (event.target.classList.contains('tunetag')) {
            const tunedata = await Thesession.gettune(event.target.dataset.id);
            this.tunedetails(tunedata);
        }
        // click on tunecard to add to my tunebook
        //else if (event.target.classList.contains('tunecard')) {
        //}
    }

    addtxtline(content) {
        this.area.innerHTML += `${content}</br>`;
    }

    clear() {
        this.area.innerHTML = "";
    }

    appendchild(node) {
        this.area.appendChild(node);
    }

    list(array) {
        let text='<div class="flex flex-wrap gap-2">';
        array.forEach(tune => {

            text += `<span data-id="${tune.id}" class="tunetag bg-blue-200 
            text-blue-800 px-3 py-1 rounded-full text-uppercase text-sm
            transition duration-300 ease-in-out hover:bg-blue-500
            hover:text-white cursor-pointer">${tune.name}</span>`;
        });
        text += '</div>';
        this.area.innerHTML += text;
    }

    loading() {
        this.area.innerHTML = `<div class="flex items-center justify-center">
        <i class="fa-solid fa-spinner fa-spin fa-3x"></i>
        </div>`;
    }

    tunedetails(tunedata) {
        const keys = tunedata.settings.map(set => set.key);
        const uniqkeys = [...new Set(keys)];
        const context = {
            tuneid: tunedata.id,
            numsettings: tunedata.settings.length,
            numtunebooks: tunedata.tunebooks,
            tunetitle: tunedata.name,
            tunerythm: tunedata.type,
            tunemodes: uniqkeys.join(' · '),
            tunealiases: tunedata.aliases.join(' / '),
        }
        let clone = this.gettemplate('#tunecard', context);
        this.area.appendChild(clone);
    }
  
    hideelement(selector){
        const hid = document.querySelector(selector);
        hid.classList.add('hidden');
    }
}

// control an input element
class ManageInput {
    constructor(inputElement, renderer) {
      this.inputElement = inputElement;
      this.renderer=renderer;
      this.setup();
    }
  
    setup() {
      this.inputElement.addEventListener('keydown', this.handleInputChange.bind(this));
    }
  
    handleInputChange(event) {
        if (event.key === 'Enter') {
            const inputValue = event.target.value;
            const isValid = this.validateInput(inputValue);
            if (isValid) {
                // Realizar la llamada AJAX si la entrada es válida
                this.makeAjaxCall(inputValue);
            } else {
                console.log('La entrada no es válida');
            }
        }
    }
  
    validateInput(value) {
      // Devuelve true si la entrada es válida, de lo contrario false.
      return value.length > 4 && typeof value == "string"; 
    }
  
    makeAjaxCall(value) {
        this.inputElement.setAttribute("disabled", "");
        this.renderer.loading();
        Thesession.search(value)
            .then( response => this.showResult(response));
    }

    showResult(array) {
        this.renderer.clear();
        this.renderer.print(`Encontradas ${array.length} tunes.`);
        this.renderer.list(array);
        this.cleanstate();
    }

    cleanstate() {
        this.inputElement.value='';
        this.inputElement.removeAttribute("disabled");
    }
}