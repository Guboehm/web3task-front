import axios, { AxiosResponse } from 'axios';
// import dotenv from 'dotenv';

// dotenv.config({ path: __dirname + '/../../.env' });
interface GraphQLResponse {
  data?: any;
  errors?: any;
}
class GraphQLService {
  private endpoint: string;
  private headers: { [key: string]: string };

  constructor() {
    this.endpoint = process.env.REACT_APP_ENDPOINT_URL || '';
    this.headers = {
      "content-type": "application",
      Authorization: process.env.REACT_APP_AUTHORIZATION_KEY || '',
    };
  }

  async getTasks(variables: { [key: string]: any } = {}): Promise<GraphQLResponse> {
    const operationName = "GetTasksQuery";
    const query = `query {
      taskCreateds(orderBy: blockTimestamp, orderDirection: desc) {
        assignee
        creator
        endDate
        id
        reward
        }
      }`;

    const graphqlQuery = {
      operationName,
      query,
      variables,
    };

    const config = {
      url: this.endpoint,
      method: "post",
      headers: this.headers,
      data: graphqlQuery,
    };

    try {
      const response: AxiosResponse = await axios(config);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to execute query: ${error.message}`);
    }
  }
}

export default GraphQLService;