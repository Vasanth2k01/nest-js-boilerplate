import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

describe('PostsController', () => {
  let controller: PostsController;

  const mockPostsService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn().mockImplementation((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    })
      .overrideProvider(PostsService)
      .useValue(mockPostsService)
      .compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create post', () => {
    const dto = { title: 'Vasanth' };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      title: 'Vasanth',
    });

    expect(mockPostsService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a post', () => {
    const dto = { title: 'Vasanth' };
    expect(controller.update('1', dto)).toEqual({
      id: 1,
      ...dto,
    });

    expect(mockPostsService.update).toHaveBeenCalled();
  });

  it('should delete a post', () => {
    const dto = { id: '1' };

    // jest.spyOn(mockPostsService, 'remove').mockReturnValue(dto);
    mockPostsService.remove.mockReturnValue(dto);

    expect(controller.remove('1')).toEqual(dto);

    expect(mockPostsService.remove).toHaveBeenCalled();
  });
});
