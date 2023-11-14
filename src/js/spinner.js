const spinner = document.querySelector('.background-spinner');

export const showSpinner = () => {
  spinner.classList.contains('is-hidden') &&
    spinner.classList.remove('is-hidden');
};

export const hideSpinner = () => {
  !spinner.classList.contains('is-hidden') &&
    spinner.classList.add('is-hidden');
};
