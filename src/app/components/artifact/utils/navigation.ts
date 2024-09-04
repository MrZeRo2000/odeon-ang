import {Router} from "@angular/router";
import {isArtifactTypeMusic, isArtifactTypeVideo} from "../../../model/artifacts";

export function artifactNavigation(router: Router, artifactId: number, artifactTypeId: number): void {
  let routePath = ''
  if (isArtifactTypeMusic(artifactTypeId)) {
    routePath = 'artifacts'
  } else if (isArtifactTypeVideo(artifactTypeId)) {
    routePath = 'artifacts-video'
  }
  if (!!routePath) {
    router.navigate(
      [routePath],
      {queryParams: {'artifactId': artifactId, 'artifactTypeId': artifactTypeId}})
  }
}

export function mediaFileNavigation(router: Router, artifactId: number, trackId?: number): void {
  const routePath = `media-files/${artifactId}`
  const params = trackId ? {queryParams: {'trackId': trackId as number}} : {}
  router.navigate([routePath], params).then()
}
