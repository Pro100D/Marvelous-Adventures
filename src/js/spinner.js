const spinner = document.querySelector('.orbit-spinner');

export const showSpinner = () => {
  spinner.classList.remove('is-hidden');
};

export const hideSpinner = () => {
  spinner.classList.add('is-hidden');
};
