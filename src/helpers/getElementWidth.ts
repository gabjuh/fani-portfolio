const getElementWidth = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    return element.offsetWidth;
  }
  return 0;
}

export default getElementWidth;