import { LinkError } from "../pages/api/link";

interface Props {
  error: number;
}

function parseError(error: LinkError): string {
  switch (error) {
    case LinkError.Empty:
      return "לא הוכנס קישור";
    case LinkError.InvalidUrl:
      return "הקישור שהוכנס לא תקין\nהקישור צריך להתחיל ב-//:http או ב- //:https";
    case LinkError.DisallowedDomain:
      return "לא ניתן ליצור קישור לאתר זה.";
    case LinkError.InvalidMethod:
      return "הבקשה נשלחה במתודה לא נכונה. נדמה שהמתכנת מטומטם";
    case LinkError.CouldntGenerateShortcode:
      return "לא הצלחתי לייצר קישור. נסה שוב מאוחר יותר.";
    default:
      return "התרחשה שגיאה. נסה שוב.";
  }
}

export default function ErrorMessage({ error }: Props) {
  return (
    <div className="w-full rounded-md bg-red-100 px-4 py-2 text-red-800">
      <p className="whitespace-pre-line">
        {parseError(error satisfies LinkError)}
      </p>
    </div>
  );
}
