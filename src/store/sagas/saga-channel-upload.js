import { channel } from '@redux-saga/core';
import { call, fork, put, take } from '@redux-saga/core/effects';
import { uploadFile } from '../../api/mock-file-uploader';
import { FILES_UPLOADING_PROGRESS, FILES_UPLOADING_START } from '../actions';

const handleProgressChange = (fileUploadingChannel, progressData) => {
  fileUploadingChannel.put({
    data: progressData,
  });
};

function* handleFilesUploadingEvent(fileUploadingChannel) {
  while (true) {
    const payload = yield take(fileUploadingChannel);
    yield put({
      type: FILES_UPLOADING_PROGRESS,
      payload: {
        data: payload.data,
      },
    });
  }
}

export function* handleFilesUploading() {
  const fileUploadingChannel = yield call(channel);

  yield fork(handleFilesUploadingEvent, fileUploadingChannel);

  while (true) {
    yield take(FILES_UPLOADING_START);
    yield fork(uploadFile, {
      url: 'https://server.api',
      files: ['file1', 'file2', 'file3'],
      onProgress: (progressData) => {
        handleProgressChange(fileUploadingChannel, progressData);
      },
    });
  }
}
