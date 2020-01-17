#!/usr/bin/env python3

import sys, os
import json
import unittest
import hashlib
sys.path.append(os.path.join(sys.path[0],'..'))
from application import app
from parameterized import parameterized, parameterized_class
from usermanager import get_salt

class TestApi(unittest.TestCase):
    def setUp(self):
        self.myapp = app.test_client()
        self.myapp.testing = True    
        self.headers = {
            'ContentType': 'application/json',
            'dataType': 'json'
        }
    def test_api_not_found_should_return_json(self):
        rv = self.myapp.get('/')
        self.assertEqual(rv.status, '404 NOT FOUND')
        self.assertTrue(b'Insert a valid api' in rv.data)
    

    @parameterized.expand([
        ('/users/me'),
        ('/messages/me'),
        ('/users/5cd6dba004078d00c65c25cc'),
        ('/messages/sent/me'),
    ])
    def test_api_login_required_get_should_return_not_loggedin_json(self, route):
        rv = self.myapp.get(route)

        self.assertEqual(rv.status, '401 UNAUTHORIZED')
    
    @parameterized.expand([('iets', 'd1f9809507ddd406f5d55541c515fcc88c6734175808df2f3e0e4fa4d01535ee')])
    def test_api_login_should_return_true_when_credentials_are_correct(self, user, password):
        login_json = {'username': user, 'password': password}
        response = self.myapp.post('/login', content_type='application/json', data=json.dumps(login_json))

        self.assertEqual(response.status, '200 OK', 'Response code shoulde be 200 when credentials are correct')
        self.assertEqual(json.loads(response.get_data()), 'true', 'Should login when credentials are correct')
    
    @parameterized.expand([('iets', 'wrong_password')])
    def test_api_login_should_return_false_when_credentials_are_incorrect(self, user, password):
        login_json = {'username': user, 'password': password}
        response = self.myapp.post('/login', content_type='application/json', data=json.dumps(login_json))

        self.assertEqual(response.status, '200 OK', 'Response code shoulde be 200 when credentials are correct')
        self.assertEqual(json.loads(response.get_data()), 'false', 'Should login when credentials are correct')
   
    @parameterized.expand([('iets', 'iets')])
    def test_api_should_handle_when_no_content_type_for_json_is_set_on_post_request(self, user, password):
        login_json = {'username': user, 'password': password}
        response = self.myapp.post('/login', data=login_json)
        json_response = json.loads(response.get_data())

        self.assertEqual(response.status, '400 BAD REQUEST')
        self.assertTrue(True if 'bad_request_exception' in json_response else False)
    
        
if __name__ == '__main__':
    unittest.main()