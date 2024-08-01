import icons from 'url:../../img/icons.svg';

export default class View {
  _data; // this private properties will be inherited into  all the views
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  } // this method will be common to all the classes

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup); // converting a string to real DOM Node Obj
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //console.log(curEl, newEl.isEqualNode(curEl));
      // UPdates TEXT CONTENT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('lalal', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // UPdates ATTRIBUTES content
      if (!newEl.isEqualNode(curEl)) {
        //console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach(attribute =>
          curEl.setAttribute(attribute.name, attribute.value)
        );
      } // replace all the attributes from the oldEl with the attributes from the newEl
    });
  } // create newMarkup, not render it => comparing new HTML to current HTML to change only the differences

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Displaying ERROR message for the USER
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
   <div>
     <svg>
       <use href="${icons}#icon-alert-triangle"></use>
     </svg>
   </div>
   <p>${message}</p>
 </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Displaying success message

  renderMessage(message = this._message) {
    const markup = `<div class="message">
   <div>
     <svg>
       <use href="${icons}#icon-smile"></use>
     </svg>
   </div>
   <p>${message}</p>
 </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
} // parent class - we export the class itself for the other view child, not making other instancess
