import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {AbstractService} from '../app.abstract.service';
import { UserGrouplistService} from './usergrouplist.service';
import {EndPoint} from '../app.endpoints';




describe('Test UserGrouplistService', () => {

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
                UserGrouplistService
            ]
        });
    });


    it('should have http', inject([ UserGrouplistService ], (service: UserGrouplistService) => {
        expect(!!service.http).toEqual(true);
    }));

    it('should have endpoint', inject([UserGrouplistService], function (service) {
        expect(!!service.endPoint).toEqual(true);
    }));

    it('should extend AbstractService', inject([ UserGrouplistService ], (service: UserGrouplistService) => {
        expect(service instanceof AbstractService).toEqual(true);
    }));

    describe('Test UserGrouplistService', function () {
        it('should use DELETE request', async(inject([UserGrouplistService, MockBackend], function (service, backend) {
            backend.connections.subscribe(function (connection) {
                expect(connection.request.method).toEqual(RequestMethod.Delete);
                var options = {
                    body: {},
                    status: 200
                };
                var responseOptions = new ResponseOptions(options);
                var response = new Response(responseOptions);
                connection.mockRespond(response);
            });
            service.deleteUserGroup();
        })));
        it('should get data from server', async(inject([UserGrouplistService, MockBackend], function (service, backend) {
            backend.connections.subscribe(function (connection) {
                var options = {
                    body: {},
                    status: 200
                };
                var responseOptions = new ResponseOptions(options);
                var response = new Response(responseOptions);
                connection.mockRespond(response);
            });
            service.deleteUserGroup("1001").subscribe(function (value) {
                expect(value).toEqual(200);
            });
        })));
        it('should have correct url', async(inject([UserGrouplistService, MockBackend], function (service, backend) {
            backend.connections.subscribe(function (connection) {
                expect(connection.request.url).toEqual('api/usergroup/1001');
                var options = {
                    body: {},
                    status: 200
                };
                var responseOptions = new ResponseOptions(options);
                var response = new Response(responseOptions);
                connection.mockRespond(response);
            });
            service.deleteUserGroup(1001);
        })));
        it('should emit error from server', async(inject([UserGrouplistService, MockBackend], function (service, backend) {
            backend.connections.subscribe(function (connection) {
                connection.mockError(new Error('some error'));
            });
            service.deleteUserGroup(1001).subscribe(function (value) {
                expect(!!value).toEqual(false);
            }, function (error) {
                expect(!!error).toEqual(true);
            });
        })));

});
