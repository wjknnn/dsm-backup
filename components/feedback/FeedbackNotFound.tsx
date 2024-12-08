import { FileWarningIcon } from 'lucide-react'

export const FeedbackNotFound = () => {
  return (
    <div className='flex flex-col items-center w-full mt-10 mb-20'>
      <div className='p-4 mb-2 border rounded-full bg-grayLight2 border-grayLight1 dark:bg-grayDark2 dark:border-grayDark15'>
        <FileWarningIcon size={32} />
      </div>
      <h2 className='text-[40px] font-semibold text-center text-balance'>
        Feedback Not Found
      </h2>
      <p className='mb-10 text-grayDark15 dark:text-grayBase'>
        피드백을 찾을 수 없습니다.
      </p>
      <div className='flex flex-col gap-1 p-3 rounded-lg bg-grayLight2 dark:bg-grayDark2 text-[14px] max-w-[320px] w-full text-grayDark15 dark:text-grayLight1'>
        <p>• 게시글이 삭제되었을 수 있습니다.</p>
        <p>• Url이 올바른지 확인해 주세요.</p>
      </div>
    </div>
  )
}
