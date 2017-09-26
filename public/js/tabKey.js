console.log('Hi')

let textareas = document.getElementsByTagName('textarea');


for (let i = 0; i < textareas.length; i++ ){
  textareas[i].onkeydown = function(element){
    if(element.key == 9 || element.which == 9){
      element.preventDefault();
      let s = this.selectionStart;
      this.value = this.value.substring(0, this.selectionStart) + "/t" + this.value.substring(this.selectionEnd);
      this.selectionEnd = s + 4;
    }
  }
}
