using System.Diagnostics;

namespace Zantt.Exceptions;

public class WellKnownApiException : Exception
{
    public string ErrorCode { get; private set; }

    public WellKnownApiException(string message, string errorCode) : base(message)
    {
        Debug.Assert(errorCode != null, "ErrorCode must not null");
        Debug.Assert(!string.IsNullOrWhiteSpace(errorCode), "ErrorCode must not empty (whitespace)");

        ErrorCode = errorCode;
    }
}
