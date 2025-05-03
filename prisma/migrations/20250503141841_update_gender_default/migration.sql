-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NamePrediction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL DEFAULT 'Girl',
    "predictor" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_NamePrediction" ("createdAt", "gender", "id", "name", "predictor") SELECT "createdAt", "gender", "id", "name", "predictor" FROM "NamePrediction";
DROP TABLE "NamePrediction";
ALTER TABLE "new_NamePrediction" RENAME TO "NamePrediction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
