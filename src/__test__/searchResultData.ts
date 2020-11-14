import { ProjectNamesapce } from 'src/app/project/project.model';
import { Any } from 'src/app/share/share.model';

export const SEARCH_RESULT_MOCK: ProjectNamesapce[] = ([
  {
    name: '<span class="token matched title">pet</span>',
    description:
      'Everything about your <span class="token matched">Pet</span>s',
    externalDocs: { description: 'Find out more', url: 'http://swagger.io' },
    apiItems: [
      {
        tags: ['pet'],
        summary: 'Add a new pet to the store',
        description: '',
        operationId: 'addPet',
        consumes: ['application/json', 'application/xml'],
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Pet object that needs to be added to the store',
            required: true,
            schema: { $ref: '#/definitions/Pet' },
            display: 'body',
          },
        ],
        responses: { 405: { description: 'Invalid input', code: 405 } },
        security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
        __id: '/pet|post',
        __produce: 'application/json',
        __info: {
          description:
            'Add a new <span class="token matched">pet</span> to the store',
          method: 'POST',
          url: '/<span class="token matched">pet</span>',
          urlForCopy: '`/pet`',
          operationId: 'add<span class="token matched">Pet</span>',
        },
        __index: 0,
        __matched: true,
        __matchedIndex: 0,
      },
      {
        tags: ['pet'],
        summary: 'Update an existing pet',
        description: '',
        operationId: 'updatePet',
        consumes: ['application/json', 'application/xml'],
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Pet object that needs to be added to the store',
            required: true,
            schema: { $ref: '#/definitions/Pet' },
            display: 'body',
          },
        ],
        responses: {
          400: { description: 'Invalid ID supplied', code: 400 },
          404: { description: 'Pet not found', code: 404 },
          405: { description: 'Validation exception', code: 405 },
        },
        security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
        __id: '/pet|put',
        __produce: 'application/json',
        __info: {
          description:
            'Update an existing <span class="token matched">pet</span>',
          method: 'PUT',
          url: '/<span class="token matched">pet</span>',
          urlForCopy: '`/pet`',
          operationId: 'update<span class="token matched">Pet</span>',
        },
        __index: 1,
        __matched: true,
        __matchedIndex: 1,
      },
      {
        tags: ['pet'],
        summary: 'Finds Pets by status',
        description:
          'Multiple status values can be provided with comma separated strings',
        operationId: 'findPetsByStatus',
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            name: 'status',
            in: 'query',
            description: 'Status values that need to be considered for filter',
            required: true,
            type: 'array',
            items: {
              type: 'string',
              enum: ['available', 'pending', 'sold'],
              default: 'available',
            },
            collectionFormat: 'multi',
            display: 'status',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: { type: 'array', items: { $ref: '#/definitions/Pet' } },
            code: 200,
          },
          400: { description: 'Invalid status value', code: 400 },
        },
        security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
        __id: '/pet/findByStatus|get',
        __produce: 'application/json',
        __info: {
          description:
            'Finds <span class="token matched">Pet</span>s by status',
          method: 'GET',
          url: '/<span class="token matched">pet</span>/findByStatus',
          urlForCopy: '`/pet/findByStatus`',
          operationId: 'find<span class="token matched">Pet</span>sByStatus',
        },
        __index: 2,
        __matched: true,
        __matchedIndex: 2,
      },
      {
        tags: ['pet'],
        summary: 'Finds Pets by tags',
        description:
          'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',
        operationId: 'findPetsByTags',
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            name: 'tags',
            in: 'query',
            description: 'Tags to filter by',
            required: true,
            type: 'array',
            items: { type: 'string' },
            collectionFormat: 'multi',
            display: 'tags',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: { type: 'array', items: { $ref: '#/definitions/Pet' } },
            code: 200,
          },
          400: { description: 'Invalid tag value', code: 400 },
        },
        security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
        deprecated: true,
        __id: '/pet/findByTags|get',
        __produce: 'application/json',
        __info: {
          description: 'Finds <span class="token matched">Pet</span>s by tags',
          method: 'GET',
          url: '/<span class="token matched">pet</span>/findByTags',
          deprecated: true,
          urlForCopy: '`/pet/findByTags`',
          operationId: 'find<span class="token matched">Pet</span>sByTags',
        },
        __index: 3,
        __matched: true,
        __matchedIndex: 3,
      },
      {
        tags: ['pet'],
        summary: 'Deletes a pet',
        description: '',
        operationId: 'deletePet',
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            name: 'api_key',
            in: 'header',
            required: false,
            type: 'string',
            display: 'api_key?',
          },
          {
            name: 'petId',
            in: 'path',
            description: 'Pet id to delete',
            required: true,
            type: 'integer',
            format: 'int64',
            display: 'petId',
          },
        ],
        responses: {
          400: { description: 'Invalid ID supplied', code: 400 },
          404: { description: 'Pet not found', code: 404 },
        },
        security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
        __id: '/pet/{petId}|delete',
        __produce: 'application/json',
        __info: {
          description: 'Deletes a <span class="token matched">pet</span>',
          method: 'DELETE',
          url:
            '/<span class="token matched">pet</span>/{<span class="token matched">pet</span>Id}',
          urlForCopy: '`/pet/${petId}`',
          operationId: 'delete<span class="token matched">Pet</span>',
        },
        __index: 4,
        __matched: true,
        __matchedIndex: 4,
      },
      {
        tags: ['pet'],
        summary: 'Find pet by ID',
        description: 'Returns a single pet',
        operationId: 'getPetById',
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            name: 'petId',
            in: 'path',
            description: 'ID of pet to return',
            required: true,
            type: 'integer',
            format: 'int64',
            display: 'petId',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: { $ref: '#/definitions/Pet' },
            code: 200,
          },
          400: { description: 'Invalid ID supplied', code: 400 },
          404: { description: 'Pet not found', code: 404 },
        },
        security: [{ api_key: [] }],
        __id: '/pet/{petId}|get',
        __produce: 'application/json',
        __info: {
          description: 'Find <span class="token matched">pet</span> by ID',
          method: 'GET',
          url:
            '/<span class="token matched">pet</span>/{<span class="token matched">pet</span>Id}',
          urlForCopy: '`/pet/${petId}`',
          operationId: 'get<span class="token matched">Pet</span>ById',
        },
        __index: 5,
        __matched: true,
        __matchedIndex: 5,
      },
      {
        tags: ['pet'],
        summary: 'Updates a pet in the store with form data',
        description: '',
        operationId: 'updatePetWithForm',
        consumes: ['application/x-www-form-urlencoded'],
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            name: 'petId',
            in: 'path',
            description: 'ID of pet that needs to be updated',
            required: true,
            type: 'integer',
            format: 'int64',
            display: 'petId',
          },
          {
            name: 'name',
            in: 'formData',
            description: 'Updated name of the pet',
            required: false,
            type: 'string',
            display: 'name?',
          },
          {
            name: 'status',
            in: 'formData',
            description: 'Updated status of the pet',
            required: false,
            type: 'string',
            display: 'status?',
          },
        ],
        responses: { 405: { description: 'Invalid input', code: 405 } },
        security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
        __id: '/pet/{petId}|post',
        __produce: 'application/json',
        __info: {
          description:
            'Updates a <span class="token matched">pet</span> in the store with form data',
          method: 'POST',
          url:
            '/<span class="token matched">pet</span>/{<span class="token matched">pet</span>Id}',
          urlForCopy: '`/pet/${petId}`',
          operationId: 'update<span class="token matched">Pet</span>WithForm',
        },
        __index: 6,
        __matched: true,
        __matchedIndex: 6,
      },
      {
        tags: ['pet'],
        summary: 'uploads an image',
        description: '',
        operationId: 'uploadFile',
        consumes: ['multipart/form-data'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'petId',
            in: 'path',
            description: 'ID of pet to update',
            required: true,
            type: 'integer',
            format: 'int64',
            display: 'petId',
          },
          {
            name: 'additionalMetadata',
            in: 'formData',
            description: 'Additional data to pass to server',
            required: false,
            type: 'string',
            display: 'additionalMetadata?',
          },
          {
            name: 'file',
            in: 'formData',
            description: 'file to upload',
            required: false,
            type: 'file',
            display: 'file?',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: { $ref: '#/definitions/ApiResponse' },
            code: 200,
          },
        },
        security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
        __id: '/pet/{petId}/uploadImage|post',
        __produce: 'application/json',
        __info: {
          description: 'uploads an image',
          method: 'POST',
          url:
            '/<span class="token matched">pet</span>/{<span class="token matched">pet</span>Id}/uploadImage',
          urlForCopy: '`/pet/${petId}/uploadImage`',
          operationId: 'uploadFile',
        },
        __index: 7,
        __matched: true,
        __matchedIndex: 7,
      },
    ],
    matched: true,
  },
  {
    name: 'store',
    description: 'Access to <span class="token matched">Pet</span>store orders',
    apiItems: [
      {
        tags: ['store'],
        summary: 'Returns pet inventories by status',
        description: 'Returns a map of status codes to quantities',
        operationId: 'getInventory',
        produces: ['application/json'],
        parameters: [],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              type: 'object',
              additionalProperties: { type: 'integer', format: 'int32' },
            },
            code: 200,
          },
        },
        security: [{ api_key: [] }],
        __id: '/store/inventory|get',
        __produce: 'application/json',
        __info: {
          description:
            'Returns <span class="token matched">pet</span> inventories by status',
          method: 'GET',
          url: '/store/inventory',
          urlForCopy: '`/store/inventory`',
          operationId: 'getInventory',
        },
        __index: 8,
        __matched: true,
        __matchedIndex: 8,
      },
      {
        tags: ['store'],
        summary: 'Place an order for a pet',
        description: '',
        operationId: 'placeOrder',
        consumes: ['application/json'],
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'order placed for purchasing the pet',
            required: true,
            schema: { $ref: '#/definitions/Order' },
            display: 'body',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: { $ref: '#/definitions/Order' },
            code: 200,
          },
          400: { description: 'Invalid Order', code: 400 },
        },
        __id: '/store/order|post',
        __produce: 'application/json',
        __info: {
          description:
            'Place an order for a <span class="token matched">pet</span>',
          method: 'POST',
          url: '/store/order',
          urlForCopy: '`/store/order`',
          operationId: 'placeOrder',
        },
        __index: 9,
        __matched: true,
        __matchedIndex: 9,
      },
      {
        tags: ['store'],
        summary: 'Delete purchase order by ID',
        description:
          'For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors',
        operationId: 'deleteOrder',
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            name: 'orderId',
            in: 'path',
            description: 'ID of the order that needs to be deleted',
            required: true,
            type: 'integer',
            minimum: 1,
            format: 'int64',
            display: 'orderId',
          },
        ],
        responses: {
          400: { description: 'Invalid ID supplied', code: 400 },
          404: { description: 'Order not found', code: 404 },
        },
        __id: '/store/order/{orderId}|delete',
        __produce: 'application/json',
        __info: {
          description: 'Delete purchase order by ID',
          method: 'DELETE',
          url: '/store/order/{orderId}',
          urlForCopy: '`/store/order/${orderId}`',
          operationId: 'deleteOrder',
        },
        __index: 10,
        __matched: false,
        __matchedIndex: -1,
      },
      {
        tags: ['store'],
        summary: 'Find purchase order by ID',
        description:
          'For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions',
        operationId: 'getOrderById',
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            name: 'orderId',
            in: 'path',
            description: 'ID of pet that needs to be fetched',
            required: true,
            type: 'integer',
            maximum: 10,
            minimum: 1,
            format: 'int64',
            display: 'orderId',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: { $ref: '#/definitions/Order' },
            code: 200,
          },
          400: { description: 'Invalid ID supplied', code: 400 },
          404: { description: 'Order not found', code: 404 },
        },
        __id: '/store/order/{orderId}|get',
        __produce: 'application/json',
        __info: {
          description: 'Find purchase order by ID',
          method: 'GET',
          url: '/store/order/{orderId}',
          urlForCopy: '`/store/order/${orderId}`',
          operationId: 'getOrderById',
        },
        __index: 11,
        __matched: false,
        __matchedIndex: -1,
      },
    ],
    matched: true,
  },
  {
    name: 'user',
    description: 'Operations about user',
    externalDocs: {
      description: 'Find out more about our store',
      url: 'http://swagger.io',
    },
    apiItems: [
      {
        tags: ['user'],
        summary: 'Create user',
        description: 'This can only be done by the logged in user.',
        operationId: 'createUser',
        consumes: ['application/json'],
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Created user object',
            required: true,
            schema: { $ref: '#/definitions/User' },
            display: 'body',
          },
        ],
        responses: {
          default: { description: 'successful operation', code: null },
        },
        __id: '/user|post',
        __produce: 'application/json',
        __info: {
          description: 'Create user',
          method: 'POST',
          url: '/user',
          urlForCopy: '`/user`',
          operationId: 'createUser',
        },
        __index: 12,
        __matched: false,
        __matchedIndex: -1,
      },
      {
        tags: ['user'],
        summary: 'Creates list of users with given input array',
        description: '',
        operationId: 'createUsersWithArrayInput',
        consumes: ['application/json'],
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'List of user object',
            required: true,
            schema: { type: 'array', items: { $ref: '#/definitions/User' } },
            display: 'body',
          },
        ],
        responses: {
          default: { description: 'successful operation', code: null },
        },
        __id: '/user/createWithArray|post',
        __produce: 'application/json',
        __info: {
          description: 'Creates list of users with given input array',
          method: 'POST',
          url: '/user/createWithArray',
          urlForCopy: '`/user/createWithArray`',
          operationId: 'createUsersWithArrayInput',
        },
        __index: 13,
        __matched: false,
        __matchedIndex: -1,
      },
      {
        tags: ['user'],
        summary: 'Creates list of users with given input array',
        description: '',
        operationId: 'createUsersWithListInput',
        consumes: ['application/json'],
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'List of user object',
            required: true,
            schema: { type: 'array', items: { $ref: '#/definitions/User' } },
            display: 'body',
          },
        ],
        responses: {
          default: { description: 'successful operation', code: null },
        },
        __id: '/user/createWithList|post',
        __produce: 'application/json',
        __info: {
          description: 'Creates list of users with given input array',
          method: 'POST',
          url: '/user/createWithList',
          urlForCopy: '`/user/createWithList`',
          operationId: 'createUsersWithListInput',
        },
        __index: 14,
        __matched: false,
        __matchedIndex: -1,
      },
      {
        tags: ['user'],
        summary: 'Logs user into the system',
        description: '',
        operationId: 'loginUser',
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            name: 'username',
            in: 'query',
            description: 'The user name for login',
            required: true,
            type: 'string',
            display: 'username',
          },
          {
            name: 'password',
            in: 'query',
            description: 'The password for login in clear text',
            required: true,
            type: 'string',
            display: 'password',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            headers: {
              'X-Expires-After': {
                type: 'string',
                format: 'date-time',
                description: 'date in UTC when token expires',
                header: 'X-Expires-After',
              },
              'X-Rate-Limit': {
                type: 'integer',
                format: 'int32',
                description: 'calls per hour allowed by the user',
                header: 'X-Rate-Limit',
              },
            },
            schema: { type: 'string' },
            code: 200,
          },
          400: {
            description: 'Invalid username/password supplied',
            code: 400,
          },
        },
        __id: '/user/login|get',
        __produce: 'application/json',
        __info: {
          description: 'Logs user into the system',
          method: 'GET',
          url: '/user/login',
          urlForCopy: '`/user/login`',
          operationId: 'loginUser',
        },
        __index: 15,
        __matched: false,
        __matchedIndex: -1,
      },
      {
        tags: ['user'],
        summary: 'Logs out current logged in user session',
        description: '',
        operationId: 'logoutUser',
        produces: ['application/json', 'application/xml'],
        parameters: [],
        responses: {
          default: { description: 'successful operation', code: null },
        },
        __id: '/user/logout|get',
        __produce: 'application/json',
        __info: {
          description: 'Logs out current logged in user session',
          method: 'GET',
          url: '/user/logout',
          urlForCopy: '`/user/logout`',
          operationId: 'logoutUser',
        },
        __index: 16,
        __matched: false,
        __matchedIndex: -1,
      },
      {
        tags: ['user'],
        summary: 'Delete user',
        description: 'This can only be done by the logged in user.',
        operationId: 'deleteUser',
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            name: 'username',
            in: 'path',
            description: 'The name that needs to be deleted',
            required: true,
            type: 'string',
            display: 'username',
          },
        ],
        responses: {
          400: { description: 'Invalid username supplied', code: 400 },
          404: { description: 'User not found', code: 404 },
        },
        __id: '/user/{username}|delete',
        __produce: 'application/json',
        __info: {
          description: 'Delete user',
          method: 'DELETE',
          url: '/user/{username}',
          urlForCopy: '`/user/${username}`',
          operationId: 'deleteUser',
        },
        __index: 17,
        __matched: false,
        __matchedIndex: -1,
      },
      {
        tags: ['user'],
        summary: 'Get user by user name',
        description: '',
        operationId: 'getUserByName',
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            name: 'username',
            in: 'path',
            description:
              'The name that needs to be fetched. Use user1 for testing. ',
            required: true,
            type: 'string',
            display: 'username',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: { $ref: '#/definitions/User' },
            code: 200,
          },
          400: { description: 'Invalid username supplied', code: 400 },
          404: { description: 'User not found', code: 404 },
        },
        __id: '/user/{username}|get',
        __produce: 'application/json',
        __info: {
          description: 'Get user by user name',
          method: 'GET',
          url: '/user/{username}',
          urlForCopy: '`/user/${username}`',
          operationId: 'getUserByName',
        },
        __index: 18,
        __matched: false,
        __matchedIndex: -1,
      },
      {
        tags: ['user'],
        summary: 'Updated user',
        description: 'This can only be done by the logged in user.',
        operationId: 'updateUser',
        consumes: ['application/json'],
        produces: ['application/json', 'application/xml'],
        parameters: [
          {
            name: 'username',
            in: 'path',
            description: 'name that need to be updated',
            required: true,
            type: 'string',
            display: 'username',
          },
          {
            in: 'body',
            name: 'body',
            description: 'Updated user object',
            required: true,
            schema: { $ref: '#/definitions/User' },
            display: 'body',
          },
        ],
        responses: {
          400: { description: 'Invalid user supplied', code: 400 },
          404: { description: 'User not found', code: 404 },
        },
        __id: '/user/{username}|put',
        __produce: 'application/json',
        __info: {
          description: 'Updated user',
          method: 'PUT',
          url: '/user/{username}',
          urlForCopy: '`/user/${username}`',
          operationId: 'updateUser',
        },
        __index: 19,
        __matched: false,
        __matchedIndex: -1,
      },
    ],
    matched: false,
  },
] as Any) as ProjectNamesapce[];