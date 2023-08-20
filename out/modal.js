const openModal = document.querySelector('.open-modal')
const closeModal = document.querySelector('.close-modal')
const apply = document.querySelector('.apply')
const dialog = document.querySelector('dialog')
const input = document.querySelector('input')
const output = document.querySelector('output')

input.addEventListener('change', e => {
  apply.value = e.target.value
})

openModal.addEventListener('click', () => {
  dialog.showModal()
})

dialog.addEventListener('close', () => {
  output.value = dialog.returnValue
})
