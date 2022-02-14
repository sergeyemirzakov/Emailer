let enterData = document.querySelector('.input__data');
let validateTrigger = document.querySelector('.btn__validate');
let finalResult = document.querySelector('.final__result ul');
let finalResultText = document.querySelector('.final__result-text');

let selectedFile;

enterData.addEventListener('change', (e) => {
  selectedFile = e.target.files[0];
});

validateTrigger.addEventListener('click', (e) => {
  if (selectedFile) {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (e) => {
      let data = e.target.result;
      let workBook = XLSX.read(data, {
        type: 'binary',
      });
      getAllEmails(workBook.Strings);
    };
  }
});

const getAllEmails = (emails) => {
  finalResultText.innerHTML = '';
  let re =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  emails.map((email) => {
    if (re.test(String(email.t))) {
      finalResult.innerHTML += `
        <li class="valid">${email.t}</li>
      `;
    } else if (email.t === '') return false;
    else {
      finalResult.innerHTML += `
      <li class="invalid">
        ${email.t}
        <span class="invalidText">Невалидный email</span>
      </li>
    `;
    }
  });
};
