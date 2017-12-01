import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { DashboardService} from './dashboard.service';
import {EndPoint} from '../app.endpoints';
import { AbstractService } from '../app.abstract.service';
import * as moment from 'moment';



describe('Test DashboardService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (mockBackend, options) => {
                        return new Http(mockBackend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                EndPoint,
                DashboardService
            ]
        });
    });

    it('should have http', inject([ DashboardService ], (service: DashboardService) => {
        expect(!!service.http).toEqual(true);
    }));

    it('should have endpoint', inject([ DashboardService ], (service: DashboardService) => {
        expect(!!service.endPoint).toEqual(true);
    }));

    it('should extend AbstractService', inject([ DashboardService ], (service: DashboardService) => {
        expect(service instanceof AbstractService).toEqual(true);
    }));

    describe('Test getWidgets', () => {
        it('should use GET request',
            async(inject([DashboardService, MockBackend], (service: DashboardService, backend: MockBackend) => {
                backend.connections.subscribe((connection: MockConnection) => {
                    expect(connection.request.method).toEqual(RequestMethod.Get);
                    const options = {
                        body: {},
                        status: 200
                    };
                    const responseOptions = new ResponseOptions(options);
                    const response = new Response(responseOptions);
                    connection.mockRespond(response);
                });

                service.getWidgets([],{});

            })));

        it('should have blank fromDate and toDate param for past24hrs',
            async(inject([DashboardService, MockBackend], (service: DashboardService, backend: MockBackend) => {
                backend.connections.subscribe((connection: MockConnection) => {
                    expect(connection.request.url).toEqual('api/dashboard?fromDate=&toDate=');
                    const options = {
                        body: {},
                        status: 200
                    };
                    const responseOptions = new ResponseOptions(options);
                    const response = new Response(responseOptions);
                    connection.mockRespond(response);
                });

                service.getWidgets([],{start: moment().subtract(24, 'hours'), end: moment(), label: "Past 24Hrs"});

            })));

        it('should have correct fromDate and toDate param for date range',
            async(inject([DashboardService, MockBackend], (service: DashboardService, backend: MockBackend) => {
                backend.connections.subscribe((connection: MockConnection) => {
                    expect(connection.request.url).toEqual('api/dashboard?fromDate='+moment().subtract(31, 'days').format("YYYY-MM-DD")+'&toDate='+moment().format("YYYY-MM-DD"));
                    const options = {
                        body: {},
                        status: 200
                    };
                    const responseOptions = new ResponseOptions(options);
                    const response = new Response(responseOptions);
                    connection.mockRespond(response);
                });

                service.getWidgets([],{start: moment().subtract(31, 'days'), end: moment(), label: "Date Range"});

            })));


        it('should get data from server',
            async(inject([DashboardService, MockBackend], (service: DashboardService, backend: MockBackend) => {
                backend.connections.subscribe((connection: MockConnection) => {
                    const options = {
                        body: {},
                        status: 200
                    };
                    const responseOptions = new ResponseOptions(options);
                    const response = new Response(responseOptions);
                    connection.mockRespond(response);
                });

                service.getWidgets([],{}).subscribe(value => {
                    expect(value).toEqual({});
                });

            })));

        it('should emit error from server',
            async(inject([DashboardService, MockBackend], (service: DashboardService, backend: MockBackend) => {
                backend.connections.subscribe((connection: MockConnection) => {
                    connection.mockError(new Error('some error'));
                });

                service.getWidgets([],{}).subscribe(value => {
                        expect(!!value).toEqual(false);
                    },
                        error=> {
                            expect(!!error).toEqual(true);
                    });
            })));
    });

    describe('Test getWidgetDetails', () => {
        it('should use GET request',
            async(inject([DashboardService, MockBackend], (service: DashboardService, backend: MockBackend) => {
                backend.connections.subscribe((connection: MockConnection) => {
                    expect(connection.request.method).toEqual(RequestMethod.Get);
                    const options = {
                        body: {},
                        status: 200
                    };
                    const responseOptions = new ResponseOptions(options);
                    const response = new Response(responseOptions);
                    connection.mockRespond(response);
                });

                service.getWidgetDetails("1",{});

            })));

        it('should have blank fromDate and toDate param for past24hrs',
            async(inject([DashboardService, MockBackend], (service: DashboardService, backend: MockBackend) => {
                backend.connections.subscribe((connection: MockConnection) => {
                    expect(connection.request.url).toEqual('api/dashboard/detail?fromDate=&toDate=&type=1');
                    const options = {
                        body: {},
                        status: 200
                    };
                    const responseOptions = new ResponseOptions(options);
                    const response = new Response(responseOptions);
                    connection.mockRespond(response);
                });

                service.getWidgetDetails("1",{start: moment().subtract(24, 'hours'), end: moment(), label: "Past 24Hrs"});

            })));

        it('should have correct fromDate and toDate param for date range',
            async(inject([DashboardService, MockBackend], (service: DashboardService, backend: MockBackend) => {
                backend.connections.subscribe((connection: MockConnection) => {
                    expect(connection.request.url).toEqual('api/dashboard/detail?fromDate='+moment().subtract(31, 'days').format("YYYY-MM-DD")+'&toDate='+moment().format("YYYY-MM-DD")+'&type=1');
                    const options = {
                        body: {},
                        status: 200
                    };
                    const responseOptions = new ResponseOptions(options);
                    const response = new Response(responseOptions);
                    connection.mockRespond(response);
                });

                service.getWidgetDetails("1",{start: moment().subtract(31, 'days'), end: moment(), label: "Date Range"});

            })));


        it('should get data from server',
            async(inject([DashboardService, MockBackend], (service: DashboardService, backend: MockBackend) => {
                backend.connections.subscribe((connection: MockConnection) => {
                    const options = {
                        body: {},
                        status: 200
                    };
                    const responseOptions = new ResponseOptions(options);
                    const response = new Response(responseOptions);
                    connection.mockRespond(response);
                });

                service.getWidgetDetails("1",{}).subscribe(value => {
                        expect(value).toEqual({});
                });
            })));

        it('should emit error from server',
            async(inject([DashboardService, MockBackend], (service: DashboardService, backend: MockBackend) => {
                backend.connections.subscribe((connection: MockConnection) => {
                    connection.mockError(new Error('some error'));
                });

                service.getWidgetDetails("1",{}).subscribe(value => {
                        expect(!!value).toEqual(false);
                     },
                        error=> {
                            expect(!!error).toEqual(true);
                     });
            })));
    });

});