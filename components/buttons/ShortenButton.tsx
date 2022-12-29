import LoadingIcon from "../icons/LoadingIcon";
import ShortenButtonContainer from "./containers/ShortenButtonContainer";

interface ShortenButtonProps {
  className: string;
  isLoading: boolean;
}

export default function ShortenButton({
  className,
  isLoading,
}: ShortenButtonProps) {
  return (
    <ShortenButtonContainer
      type="submit"
      className={`flex justify-center ${className}`}
      disabled={isLoading}
    >
      {!isLoading ? (
        <span>קצר</span>
      ) : (
        <LoadingIcon className="my-1 mx-[5.5px] h-4 w-4" />
      )}
    </ShortenButtonContainer>
  );
}
