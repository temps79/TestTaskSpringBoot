package com.example.testtask.service.excel;

import com.example.testtask.entity.Employee;
import com.example.testtask.repository.EmployeeRepository;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;


import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;

@Service
public class ExportExcelService {
    private Workbook workbook;
    private Sheet sheet;
    @Autowired
    private EmployeeRepository employeeRepository;

    public void generateExcel() {
        workbook = new XSSFWorkbook();
        sheet = workbook.createSheet();
        List<String> header= Arrays.asList("id","ФИО","Возраст","Адрес","Район","Округ","График");
        Row row = sheet.createRow(0);
        for(int i=0;i<header.size();i++){
            sheet.autoSizeColumn(i);
            row.createCell(i).setCellValue(header.get(i));
        }

    }
    public void writeData() throws IOException {
        int rowNum=1;
        List<Employee> listEmployees= (List<Employee>) employeeRepository.findAll();
        for(Employee employee:listEmployees) {
            Row row = sheet.createRow(rowNum);
            row.createCell(0).setCellValue(employee.getEmp_id());
            row.createCell(1).setCellValue(employee.getFullName());
            row.createCell(2).setCellValue(employee.getAge());
            row.createCell(3).setCellValue(employee.getHomeAddresses().getAddress());
            row.createCell(4).setCellValue(employee.getHomeAddresses().getDistrict());
            row.createCell(5).setCellValue(employee.getHomeAddresses().getRegion());
            try {
                row.createCell(6).setCellValue(new SimpleDateFormat("k:m").format(employee.getOperationMode().getStartDay())
                                                    + "-" + new SimpleDateFormat("k:m").format(employee.getOperationMode().getEndDay()));
            }catch (Exception e){
                row.createCell(6).setCellValue("График не установлен");
            }
            rowNum++;
        }
        for(int i=0;i<7;i++){
            sheet.autoSizeColumn(i);
        }

    }



    public void export(HttpServletResponse response) throws IOException {
            generateExcel();
            writeData();

            ServletOutputStream outputStream=response.getOutputStream();
            workbook.write(outputStream);
            workbook.close();
            outputStream.close();
    }
}
