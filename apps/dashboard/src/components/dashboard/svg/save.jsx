export default function Save(props) {
  return <svg {...props} version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <path fill={props.fill || '#999'} d="M28 0h-28v32h32v-28l-4-4zM16 4h4v8h-4v-8zM28 28h-24v-24h2v10h18v-10h2.343l1.657 1.657v22.343z"></path>
  </svg>;
}