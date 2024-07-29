import {Router} from "@angular/router";
import {Artifact, isArtifactTypeMusic, isArtifactTypeVideo} from "../../../model/artifacts";

export function artifactNavigation(router: Router, item: Artifact): void {
  const artifactTypeId = item.artifactType?.id!

  let routePath = ''
  if (isArtifactTypeMusic(artifactTypeId)) {
    routePath = 'artifacts'
  } else if (isArtifactTypeVideo(artifactTypeId)) {
    routePath = 'artifacts-video'
  }
  if (!!routePath) {
    router.navigate(
      [routePath],
      {queryParams: {'artifactId': item.id, 'artifactTypeId': artifactTypeId}})
  }
}
