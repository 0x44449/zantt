package zina.zantt.nabi.Exceptions;

public class WellKnownApiException extends RuntimeException {
    private final int errorCode;
    private final String errorMessage;
    private final int status;

    public WellKnownApiException(String errorMessage, int errorCode, int status) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.status = status;
    }

    public WellKnownApiException(String errorMessage) {
        this.errorCode = 0;
        this.errorMessage = errorMessage;
        this.status = 200;
    }

    public int getErrorCode() {
        return errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public int getStatus() {
        return status;
    }
}
