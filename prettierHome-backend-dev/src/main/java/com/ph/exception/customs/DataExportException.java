package com.ph.exception.customs;

public class DataExportException extends RuntimeException {
    public DataExportException(String message) {
        super(message);
    }

    public DataExportException(String message, Throwable cause) {
        super(message, cause);
    }
}
