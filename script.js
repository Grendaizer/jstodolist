const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
let array = [];
let count = 0;

function newTodo() {
  let cin = prompt('Enter your text:');
  let todo = {id:count,text:cin,checked:false};
  count+=1;
  array.push(todo)
  render(todo);
}

function deleteTodo(idDelete){
  array = array.filter(el => el.id !== idDelete);
  console.dir(array);
  render({id:idDelete,tobedeleted:true})
} 

function render(todo){
  if (todo?.tobedeleted){
    const li = document.getElementById(`todo-${todo.id}`);
    li?.remove();
  }
  else {
    const li = document.createElement('li');
    li.setAttribute('id',`todo-${todo.id}`)
    li.setAttribute('class',`${classNames.TODO_ITEM}`)
    li.innerHTML = `<input type="checkbox" ${todo.checked ? 'checked':''} onClick=toggleCheckbox(${todo.id}) class="${classNames.TODO_CHECKBOX}"/><span class="${classNames.TODO_TEXT}">${todo.text}</span>
    <button class='${classNames.TODO_DELETE}' onClick=deleteTodo(${todo.id})>DELETE</button>`
    list.appendChild(li);
  }
  updateCount();
  localStorage.setItem('array',JSON.stringify(array));
}

function updateCount(){
  itemCountSpan.textContent = array.length.toString();
  uncheckedCountSpan.textContent = array.filter(bon=>bon.checked===false).length.toString();
}

function toggleCheckbox(kolo){
  const index = array.findIndex(el => el.id === kolo);
  array[index].checked = !array[index].checked;
  updateCount();
  localStorage.setItem('array',JSON.stringify(array));
}
  document.addEventListener('DOMContentLoaded',()=>{
  const ref = localStorage.getItem('array');
  if (ref){
    array = JSON.parse(ref);
    array.forEach(el=>{
      console.log(el)
      render(el)});
  }
})