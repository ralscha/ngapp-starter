// tslint:disable-next-line:no-any
export function translateValidationMessage({code, args}: { code: string, args: any[] }): string {
  switch (code) {
    case 'DecimalMax':
      return `Must be less than ${args[1] === true ? 'or equal to ' : ''}${args[2].defaultMessage}`;
    case 'DecimalMin':
      return `Must be greater than ${args[1] === true ? 'or equal to ' : ''}${args[2].defaultMessage}`;
    case 'Digits':
      return `Numeric value out of bounds (&lt;${args[2]} digits&gt;.&lt;${args[1]} digits&gt; expected)`;
    case 'Email':
      return 'Must be a well-formed email address';
    case 'Future':
      return 'Must be a future date';
    case 'FutureOrPresent':
      return 'Must be a date in the present or in the future';
    case 'Max':
      return `Must be less than or equal to ${args[1]}`;
    case 'Min':
      return `Must be greater than or equal to ${args[1]}`;
    case 'Negative':
      return 'Must be less than 0';
    case 'NegativeOrZero':
      return 'Must be less than or equal to 0';
    case 'NotBlank':
      return 'Must not be blank';
    case 'NotEmpty':
      return 'Must not be empty';
    case 'NotNull':
      return 'Must not be null';
    case 'Past':
      return 'Must be a past date';
    case 'PastOrPresent':
      return 'Must be a date in the past or in the present';
    case 'Pattern':
      return `Must match "${args[1]}"`;
    case 'Positive':
      return 'Must be greater than 0';
    case 'PositiveOrZero':
      return 'Must be greater than or equal to 0';
    case 'Size':
      return `Size must be between ${args[2]} and ${args[1]}`;

    default:
      return code;
  }

}
