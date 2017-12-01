import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StudylistService} from './studylist.service';
import {EndPoint} from '../app.endpoints';
import { AbstractService } from '../app.abstract.service';
import * as moment from 'moment';


describe('Test StudylistService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: function (mockBackend, options) {
                        return new Http(mockBackend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                EndPoint,
                StudylistService
            ]
        });
    });
    it('should have http', inject([StudylistService], function (service) {
        expect(!!service.http).toEqual(true);
    }));
    it('should have endpoint', inject([StudylistService], function (service) {
        expect(!!service.endPoint).toEqual(true);
    }));
    it('should extend AbstractService', inject([StudylistService], function (service) {
        expect(service instanceof AbstractService).toEqual(true);
    }));
    describe('Test StudylistService', function () {
        it('should use GET request', async(inject([StudylistService, MockBackend], function (service, backend) {
            backend.connections.subscribe(function (connection) {
                expect(connection.request.method).toEqual(RequestMethod.Get);
                var options = {
                    body: {},
                    status: 200
                };
                var responseOptions = new ResponseOptions(options);
                var response = new Response(responseOptions);
                connection.mockRespond(response);
            });
            service.getListDetails({}, {});
        })));
        it('should have blank fromDate and toDate param for past24hrs and type empty', async(inject([StudylistService, MockBackend], function (service, backend) {
            backend.connections.subscribe(function (connection) {
                expect(connection.request.url).toEqual('api/studylist?fromDate=&toDate=&type=');
                var options = {
                    body: {},
                    status: 200
                };
                var responseOptions = new ResponseOptions(options);
                var response = new Response(responseOptions);
                connection.mockRespond(response);
            });
            service.getListDetails({ start: moment().subtract(24, 'hours'), end: moment(), label: "Past 24Hrs" }, { type: "" });
        })));
        it('should have correct fromDate and toDate param for date range and also type', async(inject([StudylistService, MockBackend], function (service, backend) {
            backend.connections.subscribe(function (connection) {
                expect(connection.request.url).toEqual('api/studylist?fromDate=' + moment().subtract(31, 'days').format("YYYY-MM-DD") + '&toDate=' + moment().format("YYYY-MM-DD") + '&type=');
                var options = {
                    body: {},
                    status: 200
                };
                var responseOptions = new ResponseOptions(options);
                var response = new Response(responseOptions);
                connection.mockRespond(response);
            });
            service.getListDetails({ start: moment().subtract(31, 'days'), end: moment(), label: "Date Range" }, { type: "" });
        })));
        it('should get data from server', async(inject([StudylistService, MockBackend], function (service, backend) {
            backend.connections.subscribe(function (connection) {
                var options = {
                    body: {},
                    status: 200
                };
                var responseOptions = new ResponseOptions(options);
                var response = new Response(responseOptions);
                connection.mockRespond(response);
            });
            service.getListDetails({}, {}).subscribe(function (value) {
                expect(value).toEqual({});
            });
        })));
        it('should emit error from server', async(inject([StudylistService, MockBackend], function (service, backend) {
            backend.connections.subscribe(function (connection) {
                connection.mockError(new Error('some error'));
            });
            service.getListDetails({}, {}).subscribe(function (value) {
                expect(!!value).toEqual(false);
            }, function (error) {
                expect(!!error).toEqual(true);
            });
        })));
    });
    describe('Test getStudyDetails', function () {
        it('should use GET request', async(inject([StudylistService, MockBackend], function (service, backend) {
            backend.connections.subscribe(function (connection) {
                expect(connection.request.method).toEqual(RequestMethod.Get);
                var options = {
                    body: {},
                    status: 200
                };
                var responseOptions = new ResponseOptions(options);
                var response = new Response(responseOptions);
                connection.mockRespond(response);
            });
            service.getStudyDetails([], {});
        })));
        it('should get data from server', async(inject([StudylistService, MockBackend], function (service, backend) {
            backend.connections.subscribe(function (connection) {
                var options = {
                    body: {},
                    status: 200
                };
                var responseOptions = new ResponseOptions(options);
                var response = new Response(responseOptions);
                connection.mockRespond(response);
            });
            service.getStudyDetails("").subscribe(function (value) {
                expect(value).toEqual({});
            });
        })));
        it('should emit error from server', async(inject([StudylistService, MockBackend], function (service, backend) {
            backend.connections.subscribe(function (connection) {
                connection.mockError(new Error('some error'));
            });
            service.getStudyDetails("").subscribe(function (value) {
                expect(!!value).toEqual(false);
            }, function (error) {
                expect(!!error).toEqual(true);
            });
        })));
    });
});
