<?php
namespace OCA\RandomDeclutter\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OC\Files\Filesystem;

class ApiController extends Controller {

	/**
	 * @NoAdminRequired
	 */
	public function files() {
		$files = $this->getFilesRecursive();
		$results = \OCA\Files\Helper::formatFileInfos($files);
		foreach ($results as $key => $result) {
			$path = Filesystem::getView()->getRelativePath($files[$key]->getPath());
			$results[$key]['path'] = $path;
		}
		
		return new DataResponse($results);
	}

	private function getFilesRecursive(& $results = [], $path = '') {
		$files = FileSystem::getDirectoryContent($path);
		foreach($files as $file) {
			if ($file->getType() === 'dir') {
				$this->getFilesRecursive($results, $path . '/' . $file->getName());
			} else {
				$results[] = $file;
			}
		}

		return $results;
	}

}
