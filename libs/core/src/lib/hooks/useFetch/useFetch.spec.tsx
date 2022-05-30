import { defineFeature, loadFeature } from "jest-cucumber"
import { useFetch } from './useFetch';
const feature = loadFeature(`${__dirname}/useFetch.feature`);
let mockfetch : any = null;
const mockRequest = (method : 'GET' | 'POST' | 'PUT' | 'DELETE') => {
  return {
    baseUrl : 'http://localhost:5500',
    endpoint: 'mock',
    method: method,
  }
}

defineFeature(feature, (test) => {

  beforeEach(() => {
    mockfetch = jest.fn();
    window.fetch = mockfetch;
  })

  test('Testing fetch hook', ({ given, then }) => {
    const fetchedText = "My awesome test";
    given('the fetch mocked', () => {
      mockfetch.mockImplementation(() => {
        return new Promise<Response>(resolve => {
          resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(fetchedText)),
            status: 200
          } as Response)
        });
      })
    })

    then('execute fetch successfully', async () => {
      const { statusCode, response } = await useFetch<any>(
        mockRequest('GET')
      );
      expect(statusCode).toEqual(200);
      expect(response).toStrictEqual(fetchedText);
    })
  });

  test('Testing fetch hook if there is a failure while fetching', ({ given, then }) => {
    const mockErrorMessage = "Network issues"

    given('the fetch mocked', () => {
      mockfetch.mockImplementation(() => {
        throw new Error(mockErrorMessage);
      })
    })

    then('execute fetch and receive expected errors', async () => {
      const { statusCode, errors, response } = await useFetch<any>(
        mockRequest('GET')
      );
      expect(statusCode).toEqual(503);
      expect(errors).toStrictEqual(mockErrorMessage);
      expect(response).toStrictEqual({});
    })
  })

  test('Testing fetch hook and receive a 400 as status', ({ given, then }) => {
    const mockErrorMessage = "Network issues"

    given('the fetch mocked', () => {
      mockfetch.mockImplementation(() => {
        return new Promise<Response>(resolve =>
          resolve({
            ok: false,
            status: 400
          } as Response)
        )
      })
    });

    then('execute fetch and receive expected errors', async () => {
      const { statusCode, errors, response } = await useFetch<any>(
        mockRequest('GET')
      );
      expect(statusCode).toEqual(400);
      expect(response).toStrictEqual({});
    })
  })
});

