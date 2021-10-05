package com.example.testtask.service;

import com.example.testtask.repository.OperationModeRepository;
import com.example.testtask.entity.OperationMode;
import com.example.testtask.service.impl.IOpearationModeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class OperationModeService implements IOpearationModeService {
    @Autowired
    private OperationModeRepository operationModeRepository;
    @Override
    public List<OperationMode> getAllOperationMode() {
        return (List<OperationMode>) operationModeRepository.findAll();
    }

    @Override
    public OperationMode getOperationModeById(long operationModeId) {
        Optional<OperationMode> obj=  operationModeRepository.findById(operationModeId);
        return obj.get();
    }

    @Override
    public void addOperationMode(OperationMode operationMode) {
        operationModeRepository.save(operationMode);
    }

    @Override
    public void updateOperationMode(OperationMode operationMode) {
        operationModeRepository.save(operationMode);
    }

    @Override
    public void deleteOperationMode(long operationModeId) {

        operationModeRepository.delete(operationModeRepository.findById(operationModeId).get());
    }
}
