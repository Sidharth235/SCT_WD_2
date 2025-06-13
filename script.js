const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let input = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    handleInput(button.getAttribute('data-key'));
  });
});

document.addEventListener('keydown', (e) => {
  const validKeys = '0123456789+-*/.=EnterBackspaceEscape';
  if (!validKeys.includes(e.key)) return;

  if (e.key === 'Enter') {
    handleInput('=');
  } else if (e.key === 'Backspace') {
    handleInput('←');
  } else if (e.key === 'Escape') {
    handleInput('C');
  } else {
    handleInput(e.key);
  }
});

function handleInput(key) {
  if (key === 'C') {
    input = '';
  } else if (key === '←') {
    input = input.slice(0, -1);
  } else if (key === '=') {
    try {
      // Replace safe symbols first
      const result = eval(input);
      if (result === Infinity || result === -Infinity) {
        throw new Error("Cannot divide by zero");
      }
      input = result.toString();
    } catch {
      input = 'Error';
    }
  } else {
    if (input === 'Error') input = '';
    input += key;
  }
  display.value = input;
}
