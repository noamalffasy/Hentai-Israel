import ButtonContainer from "./ButtonContainer";

export default function ShortenButtonContainer({
  className,
  ...otherProps
}: Parameters<typeof ButtonContainer>[0]) {
  return (
    <ButtonContainer
      className={`rounded-xl px-2 py-2 md:px-4 md:py-1 lg:px-6 ${className}`}
      {...otherProps}
    />
  );
}
