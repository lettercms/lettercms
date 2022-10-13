export default function HandleInput({target: {name, value, type}}) {
  if (type === 'email' && !!this.hasEmail) {
    const emailIsValid = /\w*@[a-z]{1,10}\.[a-z]{2}/.test(value);

    this.setState({
      emailIsValid
    });
  }

  this.setState({
    [name]: value,
  });
}