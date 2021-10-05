package com.example.testtask.service.impl;

import com.example.testtask.entity.OperationMode;

import java.util.List;

public interface IOpearationModeService {
    List<OperationMode> getAllOperationMode();
    OperationMode getOperationModeById(long operationModeId);
    void addOperationMode(OperationMode operationMode);
    void updateOperationMode(OperationMode operationMode);
    void deleteOperationMode(long operationModeId);
}
