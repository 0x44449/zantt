package com.zantt.exceptions;

public class WellKnownApiException extends RuntimeException {
    private final String errorCode;

    public String getErrorCode() {
        return errorCode;
    }

    public WellKnownApiException(String message, String errorCode) {
        super(message);
        assert errorCode != null && !errorCode.isEmpty() && !errorCode.trim().isEmpty() :
                "WellKnownApiException [errorCode] is null or empty";
        this.errorCode = errorCode;
    }
}
