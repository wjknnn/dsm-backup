'use client';

import { uploadFeedback } from '@/apis';
import { Button, Input, Tag } from '@/components';
import { getToken } from '@/utils/cookie/client';
import useMoonerDown from '@/utils/editor/hook/useMoonerDown';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const WriteSection = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState(new Set<string>());

  const { texts, Editor, Result } = useMoonerDown('');

  const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const updateTags = new Set(tags);
      const tag = event.currentTarget.value.replaceAll(' ', '').trim();

      if (tag !== '') {
        updateTags.add(tag);
        setTags(updateTags);
      }

      event.currentTarget.value = '';
    }
  };

  const deleteTag = (tag: string) => {
    const updateTags = new Set(tags);
    updateTags.delete(tag);
    setTags(updateTags);
  };

  const submitFeedback = async () => {
    const token = getToken() || '';
    console.log({ title, texts, tags });
    await uploadFeedback(token, {
      title: title,
      content: texts,
      tags: [...tags],
    })
      .then(() => router.push('/feedback'))
      .catch((err) => alert(err));
  };

  return (
    <div className="flex flex-col gap-6">
      <Input
        title="제목"
        placeholder="제목을 입력해 주세요.."
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <article className="flex items-center gap-4 p-6 bg-attentionBackground dark:bg-attention dark:bg-opacity-10 rounded-2xl">
        <p className="text-bodyLarge2 text-attention dark:brightness-125">
          내용 작성 팁
        </p>
        <p className="text-body2">
          MD문법으로 피드백 요청 글을 더욱 풍성하게 채워보세요.
        </p>
      </article>
      <div className="flex flex-col gap-2">
        <p className="text-bodyLarge">질문 내용</p>
        <div className="grid grid-cols-2 gap-2 h-fit sm:grid-cols-1">
          <div className="flex flex-1 h-[640px] sm:h-[320px] overflow-hidden rounded-xl">
            {Editor(
              '피드백 요청을 받고 싶은 부분, 궁금한 점 등에 대해서 마음껏 작성해 보세요..'
            )}
          </div>
          <div className="border rounded-lg border-grayLight1 dark:border-grayDark2 h-[640px] sm:h-[320px] overflow-hidden sm:-order-1">
            {Result}
          </div>
        </div>
      </div>
      <Input
        title="태그"
        placeholder="태그를 입력하여 추가해 보세요.."
        onKeyDown={addTag}
      />
      <div className="flex items-center flex-wrap gap-[6px]">
        {[...tags].map((tagName, index) => (
          <Tag
            key={index}
            tagName={tagName}
            editable
            onClick={() => deleteTag(tagName)}
          />
        ))}
      </div>
      <div className="flex justify-center gap-2 pt-8">
        <Button kind="gray" onClick={() => router.back()}>
          돌아가기
        </Button>
        <Button onClick={submitFeedback}>요청글 게시하기</Button>
      </div>
    </div>
  );
};
